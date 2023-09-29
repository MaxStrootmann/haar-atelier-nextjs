import groq from "groq";

const popularProductsQuery = groq`
*[_type == "product"] | order(popularity desc) [0...20] {
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
  popularity
}
`;

export default popularProductsQuery;
