import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ContactProps {
  receipt: {
    customerName: string;
    customerEmail: string;
    transactionDetails: Array<CartProduct>;
  };
}

const ReceiptEmail = ({ receipt }: ContactProps) => {
  if (!receipt) {
    throw new Error("Required fields are missing for the contact email.");
  }

  //... rest of the code remains unchanged

  return (
    <Html>
      <Head />
      <Preview>Iemand heeft je contactformulier ingevult!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Img
              style={image}
              src="https://haar-atelier-nextjs.vercel.app/haalogo-3x.png"
              width="200"
              height="100%"
              alt="Haar Atelier Logo"
            />
            <Text style={paragraph}>Customer Name: {receipt.customerName}</Text>
            <Text style={paragraph}>Email: {receipt.customerEmail}</Text>
            {receipt.transactionDetails.map((item) => (
              <Text style={paragraph} key={item.id}>
                Product Name: {item.name}, Quantity: {item.quantity}, Price:{" "}
                {item.price}
              </Text>
            ))}
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ReceiptEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const image = {
  marginX: "auto",
  display: "block",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const anchor = {
  color: "#556cd6",
};

const button = {
  backgroundColor: "#C0975A",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
