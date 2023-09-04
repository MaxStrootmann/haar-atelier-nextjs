import groq from "groq";

const mainCategoriesQuery = groq`
  *[_type == "hoofdcategorie"]{
    _id,
    title,
    "slug": slug.current,
    description,
    featured_image
  }
`;

export default mainCategoriesQuery;
