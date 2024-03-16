import { PrismaClient } from "@prisma/client";
import sendEmail from "lib/resend";
import { headers } from "next/headers";
import { stripe } from "lib/stripe/stripe-client";
import Stripe from "stripe";
import formatDate from "lib/stripe/formatDate";

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

  return new Response("Webhook received", { status: 200 });
}
