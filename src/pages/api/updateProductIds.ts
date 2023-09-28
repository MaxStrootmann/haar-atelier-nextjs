import { NextApiRequest, NextApiResponse } from 'next';
import client from 'lib/sanity/client';
import { v4 as uuidv4 } from 'uuid';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const oldProducts = await client.fetch(
      `*[_type == "product" && _id match "product*"]`
    );

    const updatedProducts = oldProducts.map((product: any) => {
      const newId = uuidv4();
      return { ...product, _id: newId };
    });

    const transaction = client.transaction();
    
    oldProducts.forEach((product: any) => {
      transaction.delete(product._id);
    });

    updatedProducts.forEach((product: any) => {
      transaction.create(product);
    });

    await transaction.commit();
    res.status(200).json({ message: 'Successfully updated product IDs' });
  } catch (error) {
    console.error('Sanity transaction failed:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
