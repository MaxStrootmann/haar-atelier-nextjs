import type { NextApiRequest, NextApiResponse } from "next";
import { CartProduct } from "lib/interfaces";
import urlFor from "lib/sanity/urlFor";
import Stripe from "stripe";

const stripe = new Stripe(
  process.env.NODE_ENV === "production"
    ? process.env.STRIPE_SECRET_KEY ?? ""
    : process.env.STRIPE_SECRET_TEST_KEY ?? "",
  {
    apiVersion: "2023-10-16",
  }
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // console.log("req.body.items", req.body.items);

      // 1. Calculate the total cart amount
      const totalAmount = req.body.items.reduce((accum: number, item: CartProduct) => {
        return accum + item.price * 100 * (item.quantity || 1);
      }, 0);

      // 2. Conditionally set the shipping costs
      let shippingRate;
      if (totalAmount > 7500) {
        shippingRate =
          process.env.NODE_ENV === "production" ? "shr_1PBFRtBTrHWnWUF3YjqzH1FA" : "shr_1PBFSZBTrHWnWUF3LE8zTznv";
      } else {
        shippingRate =
          process.env.NODE_ENV === "production" ? "shr_1P7dIJBTrHWnWUF3wIPIRp3s" : "shr_1P7d4IBTrHWnWUF30nMVfqRZ";
      }

      // console.log("totalAmount and shippingCost", totalAmount, shippingCost);

      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        payment_method_types: ["card", "ideal"],
        billing_address_collection: "required",
        customer_creation: "always",
        shipping_address_collection: {
          allowed_countries: ["NL"], // Include any country codes where you wish to ship. This is just a sample list.
        },
        // Add shipping costs if applicable
        line_items: [
          ...req.body.items.map((item: CartProduct) => {
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
              adjustable_quantity: {
                enabled: true,
                minimum: 1,
              },
              quantity: item.quantity ? item.quantity : 1,
            };
          }),
          // {
          //   price_data: {
          //     currency: "EUR",
          //     product_data: {
          //       name: "Verzendkosten (gratis vanaf €75)",
          //       description: "Verzending binnen 48 uur",
          //     },
          //     unit_amount: shippingCost,
          //   },
          //   quantity: 1,
          // },
        ],
        automatic_tax: { enabled: true },
        shipping_options: [
          {
            shipping_rate: shippingRate,
          },
        ],
        mode: "payment",
        invoice_creation: {
          enabled: true,
        },
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}`,
      });

      res.status(200).json(session);
    } catch (error) {
      res.status(500).json({
        message: error instanceof Error ? error.message : null,
      });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
