import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    const stripeMode = process.env.NEXT_PUBLIC_STRIPE_MODE === "test" ? "test" : "live";

    stripePromise = loadStripe(
      stripeMode === "live"
        ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
        : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_TEST_KEY ?? "",
      {
        apiVersion: "2023-10-16",
      }
    );
  }

  return stripePromise;
};

export default getStripe;
