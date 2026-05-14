import Stripe from "stripe";

const stripeMode = process.env.STRIPE_MODE === "test" ? "test" : "live";

export const stripe = new Stripe(
  stripeMode === "live"
    ? process.env.STRIPE_SECRET_KEY ?? ""
    : process.env.STRIPE_SECRET_TEST_KEY ?? "",
  {
    apiVersion: "2023-10-16",
    typescript: true,
  }
);
