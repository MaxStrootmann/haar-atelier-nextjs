import axios from 'axios';
import fs from 'fs';
import products from '/root/haar-atelier-nextjs/public/products.json';
import client from 'lib/sanity/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    for (const product of products) {
      const imageUrl = product.featured_image.url;
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'binary');
  
      const imageAsset = await client.assets.upload('image', buffer);
  
      // Updating the product's featured_image
      (product.featured_image as any)._ref = imageAsset._id;
      (product.featured_image as any)._type = "image";
    }
    fs.writeFileSync('./public/updatedProducts.json', JSON.stringify(products, null, 2));
    res.status(200).json({ status: 'success' });
  } else {
    res.status(405).end(); // Method not allowed
  }
};

