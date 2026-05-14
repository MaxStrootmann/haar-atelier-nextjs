import { ReviewSchema } from "lib/interfaces/schema";
import MetaHead from "components/MetaHead";
import HomeHero from "components/Home/HomeHero";
import HeroContent from "components/Home/HeroContent";
import { GetServerSideProps } from "next";
import { getPayloadReviews } from "lib/payload/queries/reviews";
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

export const getServerSideProps: GetServerSideProps = async () => {
  const reviews = await getPayloadReviews();

  if (!reviews) {
    throw Error("Sorry, something went wrong.");
  }

  return {
    props: { reviews },
  };
};

export default Home;
