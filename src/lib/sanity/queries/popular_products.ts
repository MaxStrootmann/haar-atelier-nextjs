import groq from "groq";

const popularProductsQuery = groq`
*[_type == "product"] | order(popularity desc) [0...20] {
  _id,
  name,
  "slug": slug.current,
  featured_image,
  price,
  in_stock,
  popularity
}
`;

export default popularProductsQuery;
