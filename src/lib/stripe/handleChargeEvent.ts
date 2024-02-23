import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

export default async function handleChargeEvent({ event, prisma }: { event: Stripe.Event; prisma: PrismaClient }) {
  if (event.type === "charge.succeeded") {
    // console.log("Logging charge.succeeded event: ", event);
    const chargeData = event.data.object as Stripe.Charge;
    const stripeId = chargeData.payment_intent as string;
    const customerEmail = chargeData.billing_details?.email as string;

    const user = await prisma.user.upsert({
      where: {
        email: customerEmail,
      },
      update: {},

      create: {
        email: customerEmail,
        name: chargeData.billing_details?.name as string,
      },
    });

    const order = await prisma.order.create({
      data: {
        amount: chargeData.amount,
        city: chargeData.billing_details?.address?.city as string,
        country: chargeData.billing_details?.address?.country as string,
        line1: chargeData.billing_details?.address?.line1 as string,
        line2: chargeData.billing_details?.address?.line2 as string,
        postalCode: chargeData.billing_details?.address?.postal_code as string,
        createdAt: new Date(chargeData.created * 1000),
        stripeId: stripeId,
        userId: user.id,
        receiptNumber: chargeData.receipt_number as string,
      },
    });

    let receiptNumber: string | null = null;
    while (receiptNumber === null) {
      await prisma.order.update({
        where: {
          stripeId: stripeId,
        },
        data: {
          receiptNumber: chargeData.receipt_number as string,
        },
      });
      receiptNumber = order.receiptNumber;
    }
  }
}
