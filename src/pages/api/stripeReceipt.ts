// pages/api/stripeReceipt.ts

import { Resend } from "resend";
import { NextApiRequest, NextApiResponse } from "next";
import ReceiptEmail from "emails/receiptEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  console.log("stripeReceipt req.body: ", req.body);

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
      throw new Error("Incomplete request body");
    }

    await resend.emails.send({
      from: "email@nngrafischontwerp.nl",
      to: ["strootmann95@gmail.com"],
      subject: "Bestelling ontvangen",
      react: ReceiptEmail({
        receipt: { customerName, customerEmail, customerAddress, transactionDetails, receiptNumber, amount, date },
      }),
    });

    res.status(200).json(req.body);
  } catch (error) {
    res.status(400).json(error);
  }
}
