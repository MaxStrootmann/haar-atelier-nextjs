import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { ReceiptProps } from "lib/types/receipt-email";

export default async function handleCheckoutEvent({
  event,
  stripe,
  prisma,
}: {
  event: Stripe.Event;
  stripe: Stripe;
  prisma: PrismaClient;
}) {
  if (event.type === "checkout.session.completed") {
    const checkoutData = event.data.object as Stripe.Checkout.Session;
    const cartItems = await stripe.checkout.sessions.listLineItems(checkoutData.id, { limit: 25 });

    const formattedDate = new Date(checkoutData.created * 1000).toLocaleString("NL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const stripeId = checkoutData.payment_intent as string;

    const orderItems = cartItems.data.map((item) => {
      return {
        stripeId: item.id,
        quantity: item.quantity as number,
        amount_total: item.amount_total,
        description: item.description,
      };
    });

    let user = await prisma.user.findUnique({
      where: {
        email: checkoutData.customer_details?.email as string,
      },
    });

    let retryCount = 0;
    const maxRetries = 5;
    const retryDelay = 1000; // milliseconds

    while (!user?.id && retryCount < maxRetries) {
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      user = await prisma.user.findUnique({
        where: {
          email: checkoutData.customer_details?.email as string,
        },
      });
      retryCount++;
    }
    retryCount = 0;
    if (!user?.id) {
      console.error("User id not found");
    }

    try {
      let retryCount = 0;
      const maxRetries = 5;
      const retryDelay = 1000; // milliseconds
      while (retryCount < maxRetries) {
        try {
          await prisma.order.update({
            where: {
              stripeId: stripeId,
              userId: user?.id, // Provide the userId field when updating the order
            },
            data: {
              items: {
                create: orderItems,
              },
            },
          });
          break; // Exit the loop if the update is successful
        } catch (error) {
          console.error("Error updating order:", retryCount);
          retryCount++;
          if (retryCount < maxRetries) {
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
          }
        }
      }
    } catch (error) {
      console.error("Error updating order after maximum retries:", error);
    }

    const completedOrder = await prisma.order.findUnique({
      where: {
        stripeId: stripeId,
      },
    });

    const receiptData: ReceiptProps = {
      customerName: checkoutData.customer_details?.name as string,
      customerEmail: checkoutData.customer_details?.email as string,
      customerAddress: {
        city: completedOrder?.city as string,
        country: completedOrder?.country as string,
        line1: completedOrder?.line1 as string,
        line2: completedOrder?.line2 as string,
        postal_code: completedOrder?.postalCode as string,
      },
      transactionDetails: orderItems,
      houseNumber: checkoutData?.custom_fields.find((f) => f.key === "house_number")?.text?.value as string,
      receiptNumber: completedOrder?.receiptNumber as string,
      amount: completedOrder?.amount as number,
      date: formattedDate,
    };

    const response = receiptData;
    console.log(response);
    return response;
  }
}
