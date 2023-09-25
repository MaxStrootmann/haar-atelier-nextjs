import groq from "groq";

const allProductsQuery = groq`
  *[_type == "product"]{
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

export default allProductsQuery;
