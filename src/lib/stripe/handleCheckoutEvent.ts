import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handleCheckoutEvent({ event, stripe }: { event: Stripe.Event; stripe: Stripe }) {
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

    const response = await fetch("https://www.haaratelier-alkmaar.nl/api/stripe-receipt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerName: checkoutData.customer_details?.name,
        customerEmail: checkoutData.customer_details?.email,
        customerAddress: checkoutData.customer_details?.address,
        transactionDetails: cartItems.data,
        receiptNumber: orderReceiptNumber,
        amount: checkoutData.amount_total,
        date: formattedDate,
      }),
    });
  }
}
