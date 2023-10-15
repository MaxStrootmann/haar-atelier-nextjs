import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-08-01"
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const sig = req.headers["stripe-signature"]!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (error) {
      return res.status(400).send(`Webhook Error: ${error}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const customerEmail = session.customer_details?.email;  // Customer's email address
      const customerName = session.customer_details?.name;
      const customerAddress = session.shipping_address_collection;  // Customer's shipping address

      const response = await fetch('/api/stripeReceipt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: customerName,
          customerEmail: customerEmail,
          customerAddress: customerAddress, 
          transactionDetails: session.line_items, // This might require an additional fetch using Stripe API based on session ID.
        }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        console.error('Error sending Stripe receipt email:', responseData.message);
      }

      res.status(200).send('Received');
    } else {
      res.status(400).end();
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
