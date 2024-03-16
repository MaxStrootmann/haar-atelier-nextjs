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

    let retries = 0;
    let receiptNumber = chargeData.receipt_number as string | null;

    while (receiptNumber === null && retries < 5) {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds
      retries++;
      receiptNumber = chargeData.receipt_number as string | null;
    }

    if (receiptNumber !== null) {
      await prisma.order.create({
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
          receiptNumber: receiptNumber,
        },
      });
    } else {
      console.log("Failed to retrieve receipt number after 5 retries.");
    }
  }
}
