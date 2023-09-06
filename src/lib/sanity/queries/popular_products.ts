import groq from "groq";

const popularProductsQuery = groq`
  *[_type == "product"]{
    _id,
    name,
    "slug": slug.current,
    description,
    featured_image,
    price,
    op_voorraad,
    sale_price,
    sku
  }
`;

export default popularProductsQuery;
