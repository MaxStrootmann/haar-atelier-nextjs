import { PrismaClient } from "@prisma/client";
import handleChargeEvent from "lib/stripe/handleChargeEvent";
import handleCheckoutEvent from "lib/stripe/handleCheckoutEvent";
import { ReceiptProps } from "lib/types/receipt-email";
import sendEmail from "lib/resend";
import { headers } from "next/headers";
import { stripe } from "lib/stripe/stripe-client";
import Stripe from "stripe";

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
    await handleChargeEvent({ event, prisma });
  }

  if (event.type === "checkout.session.completed") {
    const receiptProps = await handleCheckoutEvent({ event, stripe, prisma });
    await sendEmail(receiptProps?);
  }

  return new Response("Webhook received", { status: 200 });
}
