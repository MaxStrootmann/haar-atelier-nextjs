import type { StorefrontReview } from "lib/payload/storefront";
import MetaHead from "components/MetaHead";
import HomeHero from "components/Home/HomeHero";
import HeroContent from "components/Home/HeroContent";
import { GetServerSideProps } from "next";
import { getStorefrontReviews } from "lib/payload/storefront";
import ReviewCarousel from "components/Home/ReviewCarousel";

interface HomeProps {
  reviews: StorefrontReview[];
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
  const reviews = await getStorefrontReviews();

  if (!reviews) {
    throw Error("Sorry, something went wrong.");
  }

  return {
    props: { reviews },
  };
};

export default Home;
