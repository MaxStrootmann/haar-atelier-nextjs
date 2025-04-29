import { Resend } from "resend";
import ContactEmail from "../../emails/contactFormEmail";
import { NextApiRequest, NextApiResponse } from "next";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("req.body: ", req.body);
    ``;
    const { name, email, phoneNumber, message } = req.body;

    if (!name || !email || !phoneNumber || !message) {
      throw new Error("Incomplete request body");
    }

    await resend.emails.send({
      from: "email@manndigital.nl",
      to: "info@marloesotjes-haaratelier.nl",
      subject: "Nieuwe contactaanvraag van haaratelier-alkmaar.nl",
      react: ContactEmail({ name, email, phoneNumber, message }),
    });

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ status: "OK" }));
  } catch (error) {
    console.error("Error sending email:", error);

    res.setHeader("Content-Type", "application/json");
    res.status(500).end(JSON.stringify({ status: "error", message: "Failed to send email." }));
  }
}
