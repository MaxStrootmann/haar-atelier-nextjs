import { expect, test } from "@playwright/test";
import { execFileSync } from "node:child_process";

const serviceRoot = "/opt/services/haar-atelier-nextjs";

function sqlScalar(sql: string): string {
  return execFileSync(
    "docker",
    [
      "compose",
      "-f",
      `${serviceRoot}/compose.yaml`,
      "exec",
      "-T",
      "postgres",
      "psql",
      "-U",
      "haar_atelier",
      "-d",
      "haar_atelier",
      "-tAc",
      sql,
    ],
    { encoding: "utf8" }
  ).trim();
}

async function fillStripeCheckout(page: import("@playwright/test").Page, email: string) {
  await page.getByLabel(/e-?mail/i).fill(email);

  const houseNumber = page.getByLabel(/huisnummer/i).first();
  if (await houseNumber.isVisible().catch(() => false)) await houseNumber.fill("1");

  await page.getByLabel(/volledige naam|name/i).fill("E2E Test");

  const manualAddress = page.getByRole("button", { name: /adres handmatig invoeren/i });
  if (await manualAddress.isVisible().catch(() => false)) await manualAddress.click();

  await page.getByRole("textbox", { name: /adresregel 1/i }).fill("Damrak 1");
  await page.getByPlaceholder(/postcode/i).fill("1012LG");
  await page.getByPlaceholder(/stad/i).fill("Amsterdam");

  const cardRadio = page.getByRole("radio", { name: /kaart|card/i });
  if (await cardRadio.isVisible().catch(() => false)) await cardRadio.check({ force: true });

  const cardOption = page.getByRole("button", { name: /met kaart betalen/i });
  if (await cardOption.isVisible().catch(() => false)) await cardOption.click();

  await page.getByLabel(/kaartnummer|card number/i).fill("4242424242424242");
  await page.getByLabel(/vervaldatum|expiration/i).fill("1235");
  await page.getByRole("textbox", { name: /^CVC$/i }).fill("123");
}

test("webshop checkout succeeds in Stripe test mode and creates an order", async ({ page }) => {
  const stamp = Date.now();
  const email = `e2e+${stamp}@manndigital.test`;
  const ordersBefore = Number(sqlScalar('SELECT COUNT(*) FROM "Order";'));

  await page.goto("/shop");
  await expect(page).toHaveURL(/\/shop/);

  await page.getByRole("button", { name: /voeg toe aan winkelmandje/i }).first().click();
  await expect(page.getByText("Winkelwagen")).toBeVisible();
  await expect(page.locator("#checkout")).toBeVisible();

  await page.locator("#checkout").click();
  await page.waitForURL(/checkout\.stripe\.com/, { timeout: 45_000 });

  await fillStripeCheckout(page, email);
  await page.getByTestId("hosted-payment-submit-button").click();

  await page.waitForURL(/\/success/, { timeout: 90_000 });
  await expect(page).toHaveURL(/\/success/);

  await expect
    .poll(
      () => Number(sqlScalar(`SELECT COUNT(*) FROM "User" WHERE email = '${email.replace(/'/g, "''")}';`)),
      { timeout: 45_000, intervals: [1000, 2000, 5000] }
    )
    .toBeGreaterThan(0);

  const ordersAfter = Number(sqlScalar('SELECT COUNT(*) FROM "Order";'));
  expect(ordersAfter).toBeGreaterThan(ordersBefore);
});
