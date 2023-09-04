import groq from "groq";

const subCategoriesQuery = groq`
  *[_type == "subcategorie"]{
    _id,
    title,
    "slug": slug.current,
    description,
    featured_image
  }
`;

export default subCategoriesQuery;
