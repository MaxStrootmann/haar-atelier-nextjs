import { CategorySchema, ReviewSchema } from "lib/interfaces/schema";
import MetaHead from "components/MetaHead";
import HomeHero from "components/Home/HomeHero";
import HeroContent from "components/Home/HeroContent";
import { GetStaticProps } from "next";
import client from "lib/sanity/client";
import reviewsQuery from "lib/sanity/queries/reviews";
import { useEffect } from "react";
import ReviewCarousel from "components/Home/ReviewCarousel";

interface HomeProps {
  categories: CategorySchema[];
  reviews: ReviewSchema[];
}

const Home: React.FC<HomeProps> = ({ categories, reviews }) => {
  useEffect(() => {
  console.log(reviews)
}, []);
  return (
    <>
      <HomeHero />
      <HeroContent />
      <ReviewCarousel reviews= { reviews }/>
      <MetaHead description="Gespecialiseerd in het kleuren van haar. Lived-in balayage, faceframing, highlights, blonde & brunettes. Haircuts voor mannen & vrouwen." />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const reviews = await client.fetch(reviewsQuery);

  if (!reviews) {
    throw Error("Sorry, something went wrong.");
  }

  return {
    props: { reviews },
    revalidate: 100,
  };
};

export default Home;

