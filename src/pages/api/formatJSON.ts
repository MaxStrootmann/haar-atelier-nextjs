// Your imports
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import client from "../../lib/sanity/client";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
const Papa = require('papaparse');
const slugify = require('slugify')

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

  const uploadProductsToSanity = async (formattedJSON) => {
    const transaction = client.transaction();
    formattedJSON.forEach((product) => {
      transaction.createOrReplace(product);
    });
    await transaction.commit();
  };

  const guessCategory = async (description, name) => {
    if (description.includes('Shampoo') 
    || description.includes('shampoo')) {
      return 'Shampoo & Conditioners';

    } else if 
    (description.includes('mask') 
    || description.includes('Mask') 
    || name.includes('treatment') 
    || name.includes('Treatment')) {
      return 'Maskers & Colour Treatments';

    } else if 
    (name.includes('Protection'))
    {
      return 'Verzorging & Bescherming';
    } else {
      return 'Geen categorie'
    }
    };

    const formatDescription = (text: string) => {
      // Splitting the text by newlines and/or carriage returns
      const paragraphs = text.split(/\r?\n/).filter(paragraph => paragraph.trim() !== '');
    
      return paragraphs.map((paragraph) => {
        const isEmphasized = paragraph.includes("<em>");
        const cleanText = paragraph.replace("<em>", "").replace("</em>", "").replace(/\\n/g, "").trim();
    
        return {
          _type: 'block',
          style: 'normal',
          _key: uuidv4(),
          children: [{
            _type: 'span',
            marks: isEmphasized ? ['em'] : [],
            text: cleanText,
            _key: uuidv4()  // Adding _key to each child
          }],
          markDefs: []
        };
      }).filter(block => block.children[0].text !== '');
    };

  

  

  const formatJSON = async (originalJSON) => {
    return Promise.all(originalJSON.map(async (item, index) => {
      const buffer = await downloadImage(item['Main Variant Image']);
      const assetRef = await uploadToSanity(buffer);
      const category = await guessCategory(item['Product Description'], item['Product Name']); 
      const currentSlug = "natulique-" + slugify(item['Product Name'].toLowerCase());

    return {
      _id: `product-${index}`,
      _type: 'product',
      name: item['Product Name'],
      currency: 'EUR',
      price: item['Variant Price'],
      brand: 'Natulique',
      slug: {
        current: `${currentSlug}`,
        _type: 'slug',
      },
      category: `${category}`,
      op_voorraad: true, 
      description: formatDescription(item['Product Description']),
      featured_image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: assetRef,
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
      console.log("Parsing complete", results);
      const originalJSON = results.data;
      const formattedJSON = await formatJSON(originalJSON);
      console.dir(formattedJSON, { depth: null });
      await uploadProductsToSanity(formattedJSON);
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
