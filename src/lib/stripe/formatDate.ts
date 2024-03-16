import Stripe from "stripe";

export default function formatDate(date: number) {
  new Date(date * 1000).toLocaleString("NL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
