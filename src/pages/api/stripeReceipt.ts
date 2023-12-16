// pages/api/stripeReceipt.ts

import { Resend } from "resend";
import { NextApiRequest, NextApiResponse } from "next";
import ReceiptEmail from "emails/receiptEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  console.log("req.body: ", req.body);

  try {
    const { customerName, customerEmail, transactionDetails } = req.body;

    if (!customerName || !customerEmail || !transactionDetails) {
      throw new Error("Incomplete request body");
    }

    await resend.emails.send({
      from: "email@nngrafischontwerp.nl",
      to: "strootmann95@gmail.com",
      subject: "Bestelling ontvangen",
      react: ReceiptEmail({ receipt: { customerName, customerEmail, transactionDetails } }),
    });

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ status: "OK" }));
  } catch (error) {
    console.error("Error sending Stripe receipt:", error);

    res.setHeader("Content-Type", "application/json");
    res.status(500).end(JSON.stringify({ status: "error", message: "Failed to send Stripe receipt." }));
  }
}
