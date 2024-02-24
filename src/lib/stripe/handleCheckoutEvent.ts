import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { TransactionItem } from "lib/types/receipt-email";

const prisma = new PrismaClient();

export default async function handleCheckoutEvent({ event, stripe }: { event: Stripe.Event; stripe: Stripe }) {
  console.log("handlecheckout hit");
  if (event.type === "checkout.session.completed") {
    console.log("checkout.session.completed hit");
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
    console.log("Formatted date: ", formattedDate);
    const stripeId = checkoutData.payment_intent as string;

    const orderItems = cartItems.data.map((item) => {
      return {
        stripeId: item.id,
        quantity: item.quantity,
        amount_total: item.amount_total,
        description: item.description,
      };
    });

    // console.log("Logging checkout.session.completed event: ", checkoutData);
    // console.log("Logging cart items: ", cartItems);

    const user = await prisma.user.findUnique({
      where: {
        email: checkoutData.customer_details?.email as string,
      },
    });

    if (!user) {
      console.error("User not found");
    }

    const completedOrder = await prisma.order.update({
      where: {
        stripeId: stripeId,
      },
      data: {
        items: {
          create: orderItems,
        },
        userId: user?.id,
      },
    });

    let orderReceiptNumber: string | null = null;
    while (orderReceiptNumber === null) {
      await prisma.order.findUnique({
        where: {
          id: completedOrder.id,
        },
        select: {
          receiptNumber: true,
        },
      });
      orderReceiptNumber = completedOrder.receiptNumber;
    }

    const response = {
      customerName: checkoutData.customer_details?.name as string,
      customerEmail: checkoutData.customer_details?.email as string,
      customerAddress: {
        city: checkoutData.customer_details?.address?.city as string,
        country: checkoutData.customer_details?.address?.country as string,
        line1: checkoutData.customer_details?.address?.line1 as string,
        line2: checkoutData.customer_details?.address?.line2 as string,
        postal_code: checkoutData.customer_details?.address?.postal_code as string,
      },
      transactionDetails: cartItems.data as TransactionItem[],
      receiptNumber: orderReceiptNumber as string,
      amount: checkoutData.amount_total as number,
      date: formattedDate as string,
    };
    console.log("Logging response: ", response);
    return response;
  }
}
