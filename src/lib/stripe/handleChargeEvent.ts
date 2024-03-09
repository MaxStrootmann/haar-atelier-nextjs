import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

export default async function handleChargeEvent({ event, prisma }: { event: Stripe.Event; prisma: PrismaClient }) {
  if (event.type === "charge.succeeded") {
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

    await prisma.order.create({
      data: {
        customerEmail: customerEmail,
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
  }
}
