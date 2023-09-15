// Your imports
import axios from "axios";
import client from "../../lib/sanity/client";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
const Papa = require('papaparse');

// Default export function for the API route
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    console.log("Handler function initiated");
  // Define your inner functions here

  const downloadImage = async (url) => {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data, 'binary');
  };

  const uploadToSanity = async (buffer) => {
    const asset = await client.assets.upload('image', buffer);
    return asset._id;
  };

  const formatJSON = async (originalJSON) => {
    return Promise.all(originalJSON.map(async (item, index) => {
      const buffer = await downloadImage(item['Main Variant Image']);
      const assetRef = await uploadToSanity(buffer);


    return {
      _id: `product-${index}`,
      _type: 'product',
      name: item['Product Name'],
      currency: 'EUR', // Replace with actual currency if available
      price: item['Variant Price'],
      op_voorraad: true, // Replace with actual inventory status if available
      description: [
        {
          _type: 'block',
          style: 'normal',
          children: [{ text: item['Product Description'] }]
        }
      ],
      featured_image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: assetRef, // Replace with actual asset reference
        }
      }
    };
  }));
};

// Reading the CSV file
const csvFile = fs.readFileSync('/root/haar-atelier-nextjs/public/productsTest.csv', 'utf8');
console.log("CSV file read");

Papa.parse(csvFile, {
  header: true,
  dynamicTyping: true,
  complete: async function (results) {
    try {
      console.log("Parsing complete");
      const originalJSON = results.data;
      const formattedJSON = await formatJSON(originalJSON);
      console.dir(formattedJSON, { depth: null });
      console.log("Sending response");
      res.status(200).json(formattedJSON);
    } catch (innerErr) {
      console.error("Error in parsing or formatting:", innerErr);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
} catch (err) {
console.error("Error in handler:", err);
res.status(500).json({ error: "Internal Server Error" });
}
}
