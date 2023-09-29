import groq from "groq";

const productQuery = groq`
  *[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    description,
    featured_image,
    secondary_images,
    price,
    in_stock
  }
`;

export default productQuery;
