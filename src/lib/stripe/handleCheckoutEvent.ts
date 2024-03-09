import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";

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
        quantity: item.quantity,
        amount_total: item.amount_total,
        description: item.description,
      };
    });

    const user = await prisma.user.findUnique({
      where: {
        email: checkoutData.customer_details?.email as string,
      },
    });

    if (!user?.id) {
      console.error("User id not found");
    }

    await prisma.order.update({
      where: {
        stripeId: stripeId,
        userId: user?.id,
      },
      data: {
        items: {
          create: orderItems,
        },
      },
    });

    const completedOrder = await prisma.order.findUnique({
      where: {
        stripeId: stripeId,
      },
    });

    const response = completedOrder;
    console.log(response);
    return response;
  }
}
