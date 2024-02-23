import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";
import { PrismaClient } from "@prisma/client";
import handleChargeEvent from "lib/stripe/handleChargeEvent";
import handleCheckoutEvent from "lib/stripe/handleCheckoutEvent";
import { ReceiptProps } from "lib/types/receipt-email";
import { Resend } from "resend";
import ReceiptEmail from "emails/receiptEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

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

        await handleChargeEvent({ event, prisma });
        const receiptProps: ReceiptProps | undefined = await handleCheckoutEvent({ event, stripe });

        if (receiptProps) {
          const { customerName, customerEmail, transactionDetails, customerAddress, receiptNumber, amount, date } =
            receiptProps;
          await resend.emails.send({
            from: "Haar Atelier Alkmaar <email@nngrafischontwerp.nl>",
            to:
              process.env.NODE_ENV === "production"
                ? ["max@nngrafischontwerp.nl", "info@marloesotjes-haaratelier.nl"]
                : ["strootmann95#gmail.com"],
            subject: `Bestelling ${receiptNumber} - Haar Atelier Alkmaar`,
            react: ReceiptEmail({
              receipt: {
                customerName,
                customerEmail,
                customerAddress,
                transactionDetails,
                receiptNumber,
                amount,
                date,
              },
            }),
          });

          res.status(200).send(req);
          console.warn("Stripe webhook handled");
          break; // Exit the retry loop if all operations succeed
        } else {
          // Handle the case when receiptProps is undefined
        }
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
