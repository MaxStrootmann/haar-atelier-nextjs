// pages/api/stripeReceipt.ts

import { Resend } from "resend";
import { NextApiRequest, NextApiResponse } from "next";
import ReceiptEmail from "emails/receiptEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  // console.log("stripeReceipt req.body: ", req.body);

  try {
    const { customerName, customerEmail, transactionDetails, customerAddress, receiptNumber, amount, date } = req.body;
    if (
      !customerName ||
      !customerEmail ||
      !transactionDetails ||
      !customerAddress ||
      !receiptNumber ||
      !amount ||
      !date
    ) {
      // console.log("Incomplete request body");
    }
    console.log("sending email");
    await resend.emails.send({
      from: "Haar Atelier Alkmaar<email@nngrafischontwerp.nl>",
      to: ["strootmann95@gmail.com", "info@marloesotjes-haaratelier.nl"],
      subject: `Bestelling ${receiptNumber} - Haar Atelier Alkmaar`,
      react: ReceiptEmail({
        receipt: { customerName, customerEmail, customerAddress, transactionDetails, receiptNumber, amount, date },
      }),
    });
    console.log("email sent");
    res.status(200).json(req.body);
  } catch (error) {
    console.log("stripeReceipt error:", error);
    res.status(400).json(error);
  }
}
