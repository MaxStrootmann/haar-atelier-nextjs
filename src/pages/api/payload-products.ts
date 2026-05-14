import type { NextApiRequest, NextApiResponse } from "next";

import { getPayloadProducts } from "lib/payload/queries/products";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const slugs = typeof req.query.slugs === "string" && req.query.slugs.length > 0
      ? req.query.slugs.split(",").filter(Boolean)
      : [];
    const products = await getPayloadProducts({ limit: 200 });
    const filteredProducts = slugs.length > 0
      ? products.filter((product) => slugs.includes(product.slug))
      : products;

    res.status(200).json({ products: filteredProducts });
  } catch (error) {
    console.error("Failed to fetch Payload products", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}
