import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NODE_ENV === "production"
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
