import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";

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

      if (event.type === "checkout.session.completed") {
        console.log("event:", event);
        const checkoutData = event.data.object as Stripe.Checkout.Session;
        const cartItems = await stripe.checkout.sessions.listLineItems(checkoutData.id, { limit: 25 });

        console.log("Logging customer_details:", cartItems, checkoutData.customer_details);

        const response = await fetch("http://localhost:3000/api/stripeReceipt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerName: checkoutData.customer_details?.name,
            customerEmail: checkoutData.customer_details?.email,
            customerAddress: checkoutData.customer_details?.address,
            transactionDetails: cartItems.data, // This might require an additional fetch using Stripe API based on session ID.
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
