// pages/api/uploadToSanity.ts

import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import client from 'lib/sanity/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Read the updatedProducts.json file
      const rawData = fs.readFileSync(path.join(process.cwd(), 'public', 'updatedProducts.json'), 'utf8');
      const products = JSON.parse(rawData);

      
      // Upload each product to Sanity
      for (const product of products) {
       if (!products.name || !products.price) {
        console.error("Invalid product data: ", products);
        continue; 
      }
        await client.create({
          _type: 'product',
          ...product
        });
      }

      res.status(200).json({ status: 'success' });
     } catch (error) {
      console.error("Error uploading to Sanity: ", error);
      res.status(500).json({ status: 'error' });
    }
    
  } else {
    res.status(405).end(); // Method not allowed
  }
}
