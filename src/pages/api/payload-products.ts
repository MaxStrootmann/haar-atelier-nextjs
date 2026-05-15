import type { NextApiRequest, NextApiResponse } from "next";

import { getStorefrontProducts } from "lib/payload/storefront";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const slugs = typeof req.query.slugs === "string" && req.query.slugs.length > 0
      ? req.query.slugs.split(",").filter(Boolean)
      : [];
    const products = await getStorefrontProducts({ limit: 200 });
    const filteredProducts = slugs.length > 0
      ? products.filter((product) => slugs.includes(product.slug) && product.inStock)
      : products;

    res.status(200).json({ products: filteredProducts });
  } catch (error) {
    console.error("Failed to fetch Payload products", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
}
