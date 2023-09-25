import groq from "groq";

const productPagesQuery = groq`
  *[_type == "product"] | order(popularity desc) [0...10]{
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

export default productPagesQuery;
