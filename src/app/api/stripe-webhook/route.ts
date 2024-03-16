import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { stripe } from "lib/stripe/stripe-client";
import Stripe from "stripe";
import sendEmail from "lib/resend";

const prisma = new PrismaClient();

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: any) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (event.type === "charge.succeeded") {
    const charge = event.data.object as Stripe.Charge;
    const user = await prisma.user.upsert({
      where: {
        email: charge.billing_details.email as string,
      },
      update: {
        name: charge.billing_details.name as string,
      },
      create: {
        name: charge.billing_details.name as string,
        email: charge.billing_details.email as string,
      },
    });

    await prisma.order.create({
      data: {
        stripeId: charge.payment_intent as string,
        userId: user.id,
        amount: charge.amount,
        city: charge.billing_details.address?.city as string,
        country: charge.billing_details.address?.country as string,
        line1: charge.billing_details.address?.line1 as string,
        line2: charge.billing_details.address?.line2 as string,
        postalCode: charge.billing_details.address?.postal_code as string,
        createdAt: new Date(charge.created * 1000),
        receiptNumber: charge.receipt_number as string,
      },
    });
  }

  if (event.type === "checkout.session.completed") {
    const checkoutData = event.data.object as Stripe.Checkout.Session;
    const cartItems = await stripe.checkout.sessions.listLineItems(checkoutData.id, { limit: 25 });

    //When a checkout.session.completed event is received, your application attempts to find the corresponding order in the database using the Stripe payment intent ID. However, there might be a delay between when Stripe sends the checkout.session.completed event and when your application receives and processes the charge.succeeded event to create the order in the database.

    // If the checkout.session.completed event is processed before the charge.succeeded event, the order might not exist in the database yet when your application tries to find it. This would cause the prisma.order.findUnique call to return null, even though the order will be created shortly.

    // To handle this, your application retries the prisma.order.findUnique call up to 5 times with a 5-second delay between each attempt. This gives the charge.succeeded event some time to be processed and the order to be created in the database.
    let order;
    let retryCount = 0;
    while (!order && retryCount < 10) {
      order = await prisma.order.findUnique({
        where: {
          stripeId: checkoutData.payment_intent as string,
        },
        select: {
          id: true,
        },
      });
      retryCount++;
      console.log("Retry count:", retryCount);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    if (!order) {
      throw new Error("Order not found after 10 tries at 5 seconds between");
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        items: {
          create: cartItems.data.map((item) => ({
            stripeId: item.id,
            amount_total: item.amount_total,
            description: item.description,
            quantity: item.quantity,
          })),
        },
      },
    });

    let completedOrder;
    let completedOrderRetryCount = 0;
    while (!completedOrder && completedOrderRetryCount < 5) {
      completedOrder = await prisma.order.findUnique({
        where: {
          id: order.id,
        },
        select: {
          receiptNumber: true,
        },
      });
      completedOrderRetryCount++;
      console.log("Retry count:", completedOrderRetryCount);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    if (!completedOrder) {
      throw new Error("Order not found after 5 tries at 5 seconds between");
    }

    const receiptNumber = completedOrder?.receiptNumber;

    const emailProps = {
      customerName: checkoutData.customer_details?.name as string,
      customerEmail: checkoutData.customer_details?.email as string,
      customerAddress: {
        city: checkoutData.customer_details?.address?.city as string,
        country: checkoutData.customer_details?.address?.country as string,
        line1: checkoutData.customer_details?.address?.line1 as string,
        line2: checkoutData.customer_details?.address?.line2 as string,
        postal_code: checkoutData.customer_details?.address?.postal_code as string,
      },
      transactionDetails: cartItems.data.map((item) => ({
        stripeId: item.id as string,
        amount_total: item.amount_total as number,
        description: item.description as string,
        quantity: item.quantity as number,
      })),
      receiptNumber: receiptNumber as string,
      amount: checkoutData.amount_total as number,
      date: new Date(checkoutData?.created).toLocaleString("NL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    await sendEmail(emailProps);
  }

  return new Response("Webhook received", { status: 200 });
}
