import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";
import { PrismaClient } from "@prisma/client";
import handleChargeEvent from "lib/stripe/handleChargeEvent";
import handleCheckoutEvent from "lib/stripe/handleCheckoutEvent";
import { ReceiptProps } from "lib/types/receipt-email";
import sendEmail from "lib/resend";

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
    console.warn("Stripe webhook received");
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"]!;

    let event;
    let retryCount = 0;

    while (retryCount < 5) {
      try {
        event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);

        switch (event.type) {
          case "charge.succeeded":
            await handleChargeEvent({ event, prisma });
            console.log("handleChargeEvent done");
            break;

          case "checkout.session.completed":
            const receiptProps: ReceiptProps | undefined = await handleCheckoutEvent({ event, stripe });
            console.log("receiptProps: ", receiptProps);
            if (receiptProps) {
              await sendEmail(receiptProps);
              break;
            } else {
              console.log("receiptProps is undefined");
              break;
            }
        }

        res.status(200).send(req);
        console.warn("Stripe webhook handled");
        break; // Exit the retry loop if all operations succeed
      } catch (err) {
        console.error("stripeWebhook error:", err, "retryCount:", retryCount);
        res.status(400).send(`Webhook Error: ${err}`);
        retryCount++;
      }
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
