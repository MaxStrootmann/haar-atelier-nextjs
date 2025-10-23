import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { stripe } from "lib/stripe/stripe-client";
import Stripe from "stripe";
import sendEmail from "lib/resend";
import { Resend } from "resend";

const prisma = new PrismaClient();

const webhookSecret =
  process.env.NODE_ENV === "production" ? process.env.STRIPE_WEBHOOK_SECRET! : process.env.STRIPE_WEBHOOK_TEST_SECRET!;

export async function POST(req: Request) {
  try {
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

      // ...your existing user upsert + order.create
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
          city: charge.shipping?.address?.city as string,
          country: charge.shipping?.address?.country as string,
          line1: charge.shipping?.address?.line1 as string,
          line2: charge.shipping?.address?.line2 as string,
          postalCode: charge.shipping?.address?.postal_code as string,
          createdAt: new Date(charge.created * 1000),
          receiptNumber: charge.receipt_number as string,
        },
      });

      // fire a lightweight admin alert (no line items yet)
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Haar Atelier <email@manndigital.nl>",
        to: process.env.NODE_ENV === "production"
          ? ["info@marloesotjes-haaratelier.nl"]
          : ["strootmann95@gmail.com"],
        subject: `Nieuwe betaling ontvangen: €${(charge.amount / 100).toFixed(2)} – ${charge.billing_details.email ?? ""}`,
        text:
          `Er is betaald.\n` +
          `PI: ${charge.payment_intent}\n` +
          `Naam: ${charge.billing_details.name}\n` +
          `Email: ${charge.billing_details.email}\n` +
          `Adres: ${(charge.shipping?.address?.line1 ?? "")} ${(charge.shipping?.address?.line2 ?? "")}, ` +
          `${charge.shipping?.address?.postal_code ?? ""} ${charge.shipping?.address?.city ?? ""}\n` +
          `LET OP: bonnetje met winkelmandje volgt hierna, anders Stripe controleren!`,
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
            receiptNumber: true,
          },
        });
        retryCount++;
        console.log("Retry count:", retryCount);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      if (!order) {
        throw new Error("Order not found after 10 tries at 2 seconds between");
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

      const receiptNumber = order?.receiptNumber;

      // 👉 extract house number from custom_fields
      const hnField = checkoutData.custom_fields?.find((f) => f.key === "house_number");
      const houseNumber = (hnField as any)?.text?.value ?? "";
      console.log(hnField?.text);

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
        houseNumber: houseNumber as string,
        transactionDetails: cartItems.data.map((item) => ({
          stripeId: item.id as string,
          amount_total: item.amount_total as number,
          description: item.description as string,
          quantity: item.quantity as number,
        })),
        receiptNumber: receiptNumber as string,
        amount: checkoutData.amount_total as number,
        date: new Date(checkoutData?.created * 1000).toLocaleString("NL", {
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
  } catch (error: any) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "WEBSHOP ERROR <email@manndigital.nl>",
      to:
        process.env.NODE_ENV === "production"
          ? ["strootmann95@gmail.com", "info@marloesotjes-haaratelier.nl"]
          : ["strootmann95@gmail.com"],
      subject: `Kan email niet versturen - Haar Atelier Alkmaar`,
      text: `problemen met de webhook: ${error.message}`,
    });
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
