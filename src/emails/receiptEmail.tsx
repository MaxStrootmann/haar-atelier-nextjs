import { Body, Container, Head, Html, Img, Preview, Section, Text } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

type TransactionItem = {
  id: string;
  object: string;
  amount_discount: number;
  amount_subtotal: number;
  amount_total: number;
  currency: string;
  description: string;
  quantity: number;
};

type ContactProps = {
  receipt: {
    customerName: string;
    customerEmail: string;
    customerAddress: {
      city: string;
      country: string;
      line1: string;
      line2: string;
      postal_code: string;
    };
    transactionDetails: TransactionItem[];
    receiptNumber: string;
    amount: number;
    date: string;
  };
};

const ReceiptEmail = ({ receipt }: ContactProps) => {
  return (
    <Html>
      <Head />
      <Preview>Je hebt een bestelling!</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              fontFamily: {
                sans: ["Poppins", "sans-serif"],
                display: ["Cormorant SC", "serif"],
                serif: ["Adamina", "serif"],
              },
              colors: {
                transparent: "transparent",
                current: "currentColor",
                white: "#ffffff",
                black: "#000000",
                "grey-300": "#F5F2F0",
                "grey-500": "#47433D",
                "bg-300": "#fff9f2",
                "bg-500": "#faeede",
                "bg-800": "#fbe8d4",
                "accent-500": "#C0975A",
                natulique: "#503421",
                "bubble-gum": "#ff77e9",
                bermuda: "#78dcca",
              },
            },
          },
        }}
      >
        <Body className='bg-bg-300 font-sans'>
          <Container className='m-auto'>
            <Section className='text-center'>
              <Section className='m-auto pt-4'>
                <Img
                  src='https://drive.google.com/uc?export=view&id=1bV9a7kTZJykl8Ib-14mBGxAqB8NSZQZ4'
                  width='200'
                  height='100%'
                  alt='Haar Atelier Logo'
                />
              </Section>
              <Text>Ontvangstbewijsnummer: {receipt.receiptNumber ? receipt.receiptNumber : "4242-4242"}</Text>
              <Text>Betaald bedrag: {receipt.amount}</Text>
              <Text>Datum van betaling: {receipt.date}</Text>
              <Text>Naam: {receipt.customerName}</Text>
              <Text>Email: {receipt.customerEmail}</Text>
              <Text>
                Verzendadres:
                <br />
                {receipt.customerAddress.line1 + " " + receipt.customerAddress.line2}
                <br />
                {receipt.customerAddress.postal_code}
                <br />
                {receipt.customerAddress.city}
              </Text>
              {receipt.transactionDetails.map((item: any) => (
                <Text key={item.id}>
                  {item.name !== "Verzendkosten (gratis vanaf €75)"
                    ? `Product: ${item.description}, Aantal: ${item.quantity}, Prijs: €
                  ${item.amount_total / 100}`
                    : `Verzendkosten: €${item.amount_total / 100},-`}
                </Text>
              ))}
              <Text></Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ReceiptEmail;
