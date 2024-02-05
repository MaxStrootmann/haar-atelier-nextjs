import { ReviewSchema } from "lib/interfaces/schema";
import MetaHead from "components/MetaHead";
import HomeHero from "components/Home/HomeHero";
import HeroContent from "components/Home/HeroContent";
import { GetStaticProps } from "next";
import client from "lib/sanity/client";
import reviewsQuery from "lib/sanity/queries/reviews";
import ReviewCarousel from "components/Home/ReviewCarousel";

interface HomeProps {
  reviews: ReviewSchema[];
}

const Home: React.FC<HomeProps> = ({ reviews }) => {
  return (
    <>
      <MetaHead
        title='Haar Atelier Alkmaar | Natural, Organic, Holistic'
        description='Gespecialiseerd in kleur, balayage, highlights, natuurlijke looks.'
      />
      <HomeHero />
      <HeroContent />
      <div id='reviews'>
        <ReviewCarousel reviews={reviews} />
      </div>
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
    revalidate: 60 * 60 * 24,
  };
};

export default Home;
