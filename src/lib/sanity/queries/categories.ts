import groq from "groq";

const categoriesQuery = groq`
  *[_type == "product" ] {
    category,
  }
`;

export default categoriesQuery;
