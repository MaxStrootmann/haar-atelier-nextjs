import { Resend } from "resend";
import { ReceiptProps } from "./types/receipt-email";
import ReceiptEmail from "emails/receiptEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function sendEmail(receiptProps: ReceiptProps): Promise<void> {
  try {
    const {
      customerName,
      customerEmail,
      transactionDetails,
      customerAddress,
      receiptNumber,
      amount,
      date,
      houseNumber, // ✅ include houseNumber
    } = receiptProps;

    if (
      !customerName ||
      !customerEmail ||
      !transactionDetails ||
      !customerAddress ||
      !amount ||
      !date
    ) {
      throw new Error("Missing required data for email");
    }

    await resend.emails.send({
      from: "Haar Atelier Alkmaar <email@manndigital.nl>",
      to:
        process.env.NODE_ENV === "production"
          ? ["info@marloesotjes-haaratelier.nl"]
          : ["strootmann95@gmail.com"],
      subject: `Bestelling ${receiptNumber ?? date} - Haar Atelier Alkmaar`,
      react: ReceiptEmail({
        customerName,
        customerEmail,
        customerAddress,
        transactionDetails,
        receiptNumber,
        amount,
        date,
        houseNumber, // ✅ pass it into the component
      }),
    });
    console.log("Email sent");
  } catch ({ error, receiptNumber }: any) {
    await resend.emails.send({
      from: "WEBSHOP ERROR <email@manndigital.nl>",
      to:
        process.env.NODE_ENV === "production"
          ? ["strootmann95@gmail.com", "info@marloesotjes-haaratelier.nl"]
          : ["strootmann95@gmail.com"],
      subject: `Kan email niet versturen - Haar Atelier Alkmaar`,
      text: `Er is een fout opgetreden bij het versturen van de email voor bestelling ${receiptNumber}. De benodigde data is niet gevonden.`,
    });
  }
}
