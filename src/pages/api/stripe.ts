// pages/api/stripe.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { CartProduct } from "lib/interfaces";
import urlFor from "lib/sanity/urlFor";

const stripe = new Stripe(
  process.env.NODE_ENV === "production"
    ? process.env.STRIPE_SECRET_KEY ?? ""
    : process.env.STRIPE_SECRET_TEST_KEY ?? "",
  { apiVersion: "2023-10-16" }
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const items: CartProduct[] = req.body.items ?? [];
    const totalAmount = items.reduce(
      (accum, item) => accum + item.price * 100 * (item.quantity || 1),
      0
    );

    // Choose shipping rate based on cart total (in cents)
    const shippingRate =
      totalAmount > 7500
        ? (process.env.NODE_ENV === "production"
          ? "shr_1PBFRtBTrHWnWUF3YjqzH1FA"
          : "shr_1PBFSZBTrHWnWUF3LE8zTznv")
        : (process.env.NODE_ENV === "production"
          ? "shr_1P7dIJBTrHWnWUF3wIPIRp3s"
          : "shr_1P7d4IBTrHWnWUF30nMVfqRZ");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "pay",
      payment_method_types: ["card", "ideal"],
      automatic_tax: { enabled: true },

      billing_address_collection: "required",
      customer_creation: "always",
      shipping_address_collection: { allowed_countries: ["NL"] },
      shipping_options: [{ shipping_rate: shippingRate }],

      // Optional: if you want to correlate this session to a user/cart id
      // client_reference_id: req.body.cartId ?? undefined,

      locale: "nl",
      custom_fields: [
        {
          key: "house_number",
          label: { type: "custom", custom: "Huisnummer" },
          type: "text",
          text: { minimum_length: 1, maximum_length: 10 },
          // Required by default (don’t set optional: true)
        },
      ],

      line_items: items.map((item) => {
        const imgUrl = urlFor(item.featured_image).url();
        return {
          price_data: {
            currency: "EUR",
            product_data: {
              name: item.name,
              images: [imgUrl],
              metadata: {
                basePrice: item.price * 79,
                taxAmount: item.price * 21,
              },
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity || 1,
          adjustable_quantity: { enabled: true, minimum: 1 },
        };
      }),

      invoice_creation: { enabled: true },
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}`,
    });

    return res.status(200).json(session);
  } catch (error) {
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
