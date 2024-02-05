import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2023-10-16",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"]!;

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);

      if (event.type === "charge.succeeded") {
        console.log("Logging charge.succeeded event: ", event);
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
          },
        });
      }

      if (event.type === "checkout.session.completed") {
        const checkoutData = event.data.object as Stripe.Checkout.Session;
        const cartItems = await stripe.checkout.sessions.listLineItems(checkoutData.id, { limit: 25 });

        const stripeId = checkoutData.payment_intent as string;

        const orderItems = cartItems.data.map((item) => {
          return {
            stripeId: item.id,
            quantity: item.quantity,
            amount_total: item.amount_total,
            description: item.description,
          };
        });

        console.log("Logging checkout.session.completed event: ", checkoutData);
        console.log("Logging cart items: ", cartItems);

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
            userId: user?.id, // Add the userId field
          },
        });

        const order = await prisma.order.findUnique({
          where: {
            id: completedOrder.id,
          },
          select: {
            receiptNumber: true,
          },
        });

        const response = await fetch("http://localhost:3000/api/stripeReceipt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerName: checkoutData.customer_details?.name,
            customerEmail: checkoutData.customer_details?.email,
            customerAddress: checkoutData.customer_details?.address,
            transactionDetails: cartItems.data,
            receiptNumber: order?.receiptNumber,
            amount: checkoutData.amount_total,
            date: new Date(checkoutData.created * 1000),
          }),
        });
      }

      res.status(200).send(req);
    } catch (err) {
      console.log("error:", err);
      res.status(400).send(`Webhook Error: ${err}`);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
