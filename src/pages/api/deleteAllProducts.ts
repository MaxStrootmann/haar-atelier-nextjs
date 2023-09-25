import { ProductSchema } from "lib/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: "nc8y31kd",
  dataset: "production",
  apiVersion: "2023-08-23",
  token: process.env.SANITY_PROJECT_TOKEN,
  useCdn: false // `false` if you want to ensure fresh data
});


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const query = '*[_type == "product"]{ _id }';
      const products = await client.fetch(query);

      if (products.length === 0) {
        return res.status(200).json({ message: 'No products to delete' });
      }

      const transaction = client.transaction();
      products.forEach((product: any) => {
        transaction.delete(product._id);
      });

      await transaction.commit();
      res.status(200).json({ message: 'All products deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });  // Only POST is allowed
  }
};
