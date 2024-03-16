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
import { ReceiptProps } from "lib/types/receipt-email";
import * as React from "react";

const ReceiptEmail = (receiptProps: ReceiptProps) => {
  const line1 = receiptProps.customerAddress.line1;
  const line2 = receiptProps.customerAddress.line2 === null ? "" : receiptProps.customerAddress.line2;
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
              Ontvangstbewijs nummer: {receiptProps.receiptNumber}
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
                    {receiptProps.customerAddress.postal_code}
                    <br />
                    {receiptProps.customerAddress.city}
                  </Text>
                  <Heading as='h2' className='text-base my-0 text-slate-500 pt-2'>
                    Betaald bedrag:
                  </Heading>
                  <Text className='my-0'>€{(receiptProps.amount / 100).toFixed(2).replace(".", ",")}</Text>
                </Column>
                <Column className='text-left max-w-[300px] inline-block align-top'>
                  <Heading as='h2' className='text-base my-0 text-slate-500 pt-2'>
                    Naam:
                  </Heading>
                  <Text className='my-0'>{receiptProps.customerName}</Text>
                  <Heading as='h2' className='text-base my-0 text-slate-500 pt-2'>
                    Email:
                  </Heading>
                  <Text className='my-0'>{receiptProps.customerEmail}</Text>
                  <Heading as='h2' className='text-base my-0 text-slate-500 pt-2'>
                    Datum van betaling:
                  </Heading>
                  <Text className='my-0'>{receiptProps.date}</Text>
                </Column>
              </Row>
            </Section>
            <Section className='text-left'>
              <Heading as='h2' className='text-base my-0 text-slate-500 pt-16 pl-2 pb-4'>
                Overzicht
              </Heading>
              <Section className='bg-slate-100 p-2'>
                {receiptProps.transactionDetails.map((item: any) => (
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
                    €{(receiptProps.amount / 100).toFixed(2).replace(".", ",")}
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
