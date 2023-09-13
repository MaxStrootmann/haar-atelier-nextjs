import groq from "groq";

const reviewsQuery = groq`
  *[_type == "review"]{
    _id,
    name,
    inhoud,
    foto,
  }
`;

export default reviewsQuery;
