import groq from "groq";

const productsBySlugsQuery = groq`
  *[_type == "product" && slug.current in $slugs]{
    _id,
    name,
    "slug": slug.current,
    description,
    featured_image,
    price,
    op_voorraad,
    sku
  }
`;

export default productsBySlugsQuery;
