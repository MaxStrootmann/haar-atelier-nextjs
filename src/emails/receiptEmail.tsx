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
  // Raw values exactly as received
  const line1Raw = receiptProps.customerAddress?.line1 ?? "";
  const line2Raw = receiptProps.customerAddress?.line2 ?? "";
  const houseNumberRaw =
    (receiptProps as any).houseNumber ??
    (receiptProps as any).hn ??
    "";
  const postalCode = receiptProps.customerAddress?.postal_code ?? "";
  const city = receiptProps.customerAddress?.city ?? "";
  const country = receiptProps.customerAddress?.country ?? "";

  // Helpers (inline)
  const hasNumber = (val: string) => /\d/.test(val);
  const norm = (v: string) => v.trim().toLowerCase();
  const extractNumbers = (v: string): string[] => {
    // Extract number-like tokens such as 6, 6a, 12-3, 12/3, 12b, etc.
    // Normalize by removing spaces and lowercasing.
    const matches = v.match(/\d+[a-zA-Z\-\/]*/g) ?? [];
    const normed = matches.map((m) => m.replace(/\s+/g, "").toLowerCase());
    // unique
    return Array.from(new Set(normed));
  };

  // Collect number-like tokens from line1, line2, and custom field
  const numsLine1 = extractNumbers(line1Raw);
  const numsLine2 = extractNumbers(line2Raw);
  const numsCustom = houseNumberRaw ? extractNumbers(String(houseNumberRaw)) : [];

  // Build a combined set to check for conflicts
  const combinedNumbersSet = new Set<string>([
    ...numsLine1,
    ...numsLine2,
    ...numsCustom,
  ].filter(Boolean));
  const hasConflict =
    combinedNumbersSet.size > 1; // more than one distinct number-like value present

  // Start with originals for display block (used only when no conflict)
  let displayLine1 = line1Raw;
  let displayLine2 = line2Raw;

  // De-duplication rules for the copy/paste block (only if there is NO conflict)
  if (!hasConflict) {
    // If line2 is wholly contained in line1 and includes digits, drop it
    if (
      line1Raw &&
      line2Raw &&
      norm(line1Raw).includes(norm(line2Raw)) &&
      hasNumber(line2Raw)
    ) {
      displayLine2 = "";
    }

    // If the custom houseNumber is already visible in line1 or line2, don't append
    const customHN = norm(String(houseNumberRaw || ""));
    const hnAlreadyPresent =
      !!customHN &&
      (
        norm(line1Raw).includes(customHN) ||
        norm(line2Raw).includes(customHN)
      );

    // If neither line has any digit at all, but we have a housenumber, append it to line1
    if (!hnAlreadyPresent && !!houseNumberRaw && !hasNumber(line1Raw) && !hasNumber(line2Raw)) {
      displayLine1 = `${line1Raw} ${houseNumberRaw}`.trim();
    }
  }

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
        <Body className="bg-white font-sans">
          <Container className="text-center">
            <Section className="bg-bg-300 w-full h-36">
              <Section className="bg-bg-300 py-4 w-20">
                <Img
                  src="https://res.cloudinary.com/strootmann/image/upload/v1707280845/haa-logo_lo5h8d.png"
                  width="320"
                  height="100%"
                  alt="Haar Atelier Logo"
                />
              </Section>
            </Section>

            <Heading as="h1" className="text-2xl font-display">
              Bestelling van Haar Atelier Alkmaar
            </Heading>
            <Heading as="h2" className="text-base font-light">
              Ontvangstbewijs nummer: {receiptProps.receiptNumber}
            </Heading>

            <Section>
              <Row>
                <Column className="text-left max-w-[300px] inline-block align-top pl-10 pr-24">
                  {/* Show copy/paste block only if there's NO conflict */}
                  {!hasConflict && (
                    <>
                      <Heading as="h2" className="text-base my-0 text-slate-500 pt-2">
                        Verzendadres:
                      </Heading>
                      <Text className="my-0">
                        {displayLine1} {displayLine2}
                        <br />
                        {postalCode} {city}
                        <br />
                        {country}
                      </Text>
                    </>
                  )}

                  {/* Always show the exact raw fields */}
                  <Heading as="h2" className={`text-base my-0 text-slate-500 ${!hasConflict ? "pt-4" : "pt-2"}`}>
                    Verzendadres (exact zoals ingevuld):
                  </Heading>
                  <Text className="my-0">
                    <strong>Huisnummer:</strong> {houseNumberRaw || ""}
                  </Text>
                  <Text className="my-0">
                    <strong>Adresregel 1:</strong> {line1Raw}
                  </Text>
                  <Text className="my-0">
                    <strong>Adresregel 2:</strong> {line2Raw}
                  </Text>
                  <Text className="my-0">
                    <strong>Postcode:</strong> {postalCode}
                  </Text>
                  <Text className="my-0">
                    <strong>Stad:</strong> {city}
                  </Text>
                  <Text className="my-0">
                    <strong>Land:</strong> {country}
                  </Text>

                  <Heading as="h2" className="text-base my-0 text-slate-500 pt-4">
                    Betaald bedrag:
                  </Heading>
                  <Text className="my-0">
                    €{(receiptProps.amount / 100).toFixed(2).replace(".", ",")}
                  </Text>
                </Column>

                <Column className="text-left max-w-[300px] inline-block align-top">
                  <Heading as="h2" className="text-base my-0 text-slate-500 pt-2">
                    Naam:
                  </Heading>
                  <Text className="my-0">{receiptProps.customerName}</Text>

                  <Heading as="h2" className="text-base my-0 text-slate-500 pt-2">
                    Email:
                  </Heading>
                  <Text className="my-0">{receiptProps.customerEmail}</Text>

                  <Heading as="h2" className="text-base my-0 text-slate-500 pt-2">
                    Datum van betaling:
                  </Heading>
                  <Text className="my-0">{receiptProps.date}</Text>
                </Column>
              </Row>
            </Section>

            <Section className="text-left">
              <Heading as="h2" className="text-base my-0 text-slate-500 pt-16 pl-2 pb-4">
                Overzicht
              </Heading>
              <Section className="bg-slate-100 p-2">
                {receiptProps.transactionDetails.map((item: any) => (
                  <Row key={item.id} className="p-2">
                    <Column>
                      {item.name !== "Verzendkosten (gratis vanaf €75)"
                        ? `${item.description} x ${item.quantity}`
                        : `Verzendkosten: €${item.amount_total / 100},-`}
                    </Column>
                    <Column className="text-right">
                      {`€${(item.amount_total / 100).toFixed(2).replace(".", ",")}`}
                    </Column>
                  </Row>
                ))}
                <Hr />
                <Row className="p-2">
                  <Column>
                    <Heading as="h2" className="text-base my-0 text-slate-600">
                      Bedrag dat in rekening is gebracht
                    </Heading>
                  </Column>
                  <Column className="text-right text-slate-600 font-bold">
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
