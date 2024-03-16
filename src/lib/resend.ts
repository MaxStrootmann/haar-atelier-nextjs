import { Resend } from "resend";
import { ReceiptProps } from "./types/receipt-email";
import ReceiptEmail from "emails/receiptEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmail(receiptProps: ReceiptProps): Promise<void> {
  const { customerName, customerEmail, transactionDetails, customerAddress, receiptNumber, amount, date } =
    receiptProps;
  if (!customerName || !customerEmail || !transactionDetails || !customerAddress || !amount || !date) {
    await resend.emails.send({
      from: "Haar Atelier Alkmaar <email@nngrafischontwerp.nl>",
      to:
        process.env.NODE_ENV === "production"
          ? ["max@nngrafischontwerp.nl", "info@marloesotjes-haaratelier.nl"]
          : ["strootmann95#gmail.com"],
      subject: `Bestelling ${receiptNumber} - Haar Atelier Alkmaar`,
      react: ReceiptEmail({
        customerName,
        customerEmail,
        customerAddress,
        transactionDetails,
        receiptNumber,
        amount,
        date,
      }),
    });
    throw new Error("Missing required data for email");
  }
  await resend.emails.send({
    from: "Haar Atelier Alkmaar <email@nngrafischontwerp.nl>",
    to:
      process.env.NODE_ENV === "production"
        ? ["max@nngrafischontwerp.nl", "info@marloesotjes-haaratelier.nl"]
        : ["strootmann95#gmail.com"],
    subject: `Bestelling ${receiptNumber} - Haar Atelier Alkmaar`,
    react: ReceiptEmail({
      customerName,
      customerEmail,
      customerAddress,
      transactionDetails,
      receiptNumber,
      amount,
      date,
    }),
  });
  console.log("Email sent");
}
