import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/components";
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
  const line1 = receipt.customerAddress.line1;
  const line2 = receipt.customerAddress.line2 === null ? "" : receipt.customerAddress.line2;
  return (
    <Html>
      <Head />
      <Preview>Je hebt een bestelling!</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              fontFamily: {
                sans: [
                  "Seravek",
                  "Gill Sans Nova",
                  "Ubuntu",
                  "Calibri",
                  "DejaVu Sans",
                  "source-sans-pro",
                  "sans-serif",
                ],
                display: ["Charter", "Bitstream Charter", "Sitka Text", "Cambria", "serif"],
                serif: ["Charter", "Bitstream Charter", "Sitka Text", "Cambria", "serif"],
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
        <Body className='bg-white font-sans'>
          <Container className='text-center'>
            <Section className='bg-bg-300 w-full h-36'>
              <Section className='bg-bg-300 py-4 w-20'>
                <Img
                  src='https://res.cloudinary.com/strootmann/image/upload/v1707280845/haa-logo_lo5h8d.png'
                  width='320'
                  height='100%'
                  alt='Haar Atelier Logo'
                />
              </Section>
            </Section>
            <Heading as='h1' className='text-2xl font-display'>
              Bestelling van Haar Atelier Alkmaar
            </Heading>
            <Heading as='h2' className='text-base font-light'>
              Ontvangstbewijs nummer: {receipt.receiptNumber}
            </Heading>
            <Section>
              <Row>
                <Column className='text-left max-w-[300px] inline-block align-top pl-10 pr-24'>
                  <Heading as='h2' className='text-base my-0 text-slate-500 pt-2'>
                    Verzendadres:
                  </Heading>
                  <Text className='my-0'>
                    {line1 + " " + line2}
                    <br />
                    {receipt.customerAddress.postal_code}
                    <br />
                    {receipt.customerAddress.city}
                  </Text>
                  <Heading as='h2' className='text-base my-0 text-slate-500 pt-2'>
                    Betaald bedrag:
                  </Heading>
                  <Text className='my-0'>€{(receipt.amount / 100).toFixed(2).replace(".", ",")}</Text>
                </Column>
                <Column className='text-left max-w-[300px] inline-block align-top'>
                  <Heading as='h2' className='text-base my-0 text-slate-500 pt-2'>
                    Naam:
                  </Heading>
                  <Text className='my-0'>{receipt.customerName}</Text>
                  <Heading as='h2' className='text-base my-0 text-slate-500 pt-2'>
                    Email:
                  </Heading>
                  <Text className='my-0'>{receipt.customerEmail}</Text>
                  <Heading as='h2' className='text-base my-0 text-slate-500 pt-2'>
                    Datum van betaling:
                  </Heading>
                  <Text className='my-0'>{receipt.date}</Text>
                </Column>
              </Row>
            </Section>
            <Section className='text-left'>
              <Heading as='h2' className='text-base my-0 text-slate-500 pt-16 pl-2 pb-4'>
                Overzicht
              </Heading>
              <Section className='bg-slate-100 p-2'>
                {receipt.transactionDetails.map((item: any) => (
                  <Row key={item.id} className='p-2'>
                    <Column>
                      {item.name !== "Verzendkosten (gratis vanaf €75)"
                        ? `${item.description} x ${item.quantity}`
                        : `Verzendkosten: €${item.amount_total / 100},-`}
                    </Column>
                    <Column className='text-right'>{`€${(item.amount_total / 100)
                      .toFixed(2)
                      .replace(".", ",")}`}</Column>
                  </Row>
                ))}
                <Hr></Hr>
                <Row className='p-2'>
                  <Column>
                    <Heading as='h2' className='text-base my-0 text-slate-600'>
                      Bedrag dat in rekening is gebracht
                    </Heading>
                  </Column>
                  <Column className='text-right text-slate-600 font-bold'>
                    €{(receipt.amount / 100).toFixed(2).replace(".", ",")}
                  </Column>
                </Row>
              </Section>
            </Section>
            <Text></Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ReceiptEmail;
