import groq from "groq";

const popularProductsQuery = groq`
  *[_type == "product" && popularity > 0] | order(popularity desc) [0...20]{
    _id,
    name,
    brand,
    category,
    "slug": slug.current,
    description,
    featured_image,
    secondary_images,
    price,
    in_stock,
  }
`;

export default popularProductsQuery;
