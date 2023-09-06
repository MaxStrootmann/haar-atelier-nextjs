import groq from "groq";

const productQuery = groq`
  *[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    description,
    featured_image,
    price,
    op_voorraad,
    "subcategories": subcategories[]->{
      title,
      'slug': slug.current
    },
  }
`;

export default productQuery;
