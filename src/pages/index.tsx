import { CategorySchema, ReviewSchema } from "lib/interfaces/schema";
import MetaHead from "components/MetaHead";
import HomeHero from "components/Home/HomeHero";
import HeroContent from "components/Home/HeroContent";
import { GetStaticProps } from "next";
import client from "lib/sanity/client";
import reviewsQuery from "lib/sanity/queries/reviews";
import { useEffect } from "react";
import ReviewCarousel from "components/Home/ReviewCarousel";
import axios from "axios";
import { useFacebookSDK } from "lib/useFacebookSDK";

interface HomeProps {
  categories: CategorySchema[];
  reviews: ReviewSchema[];
}

const Home: React.FC<HomeProps> = ({ categories, reviews }) => {
  useFacebookSDK();
  const fbLogin = () => {
    if (window.FB) {
    window.FB.login((response) => {
      console.log(response.authResponse.accessToken);
      fetch(`https://haar-atelier-nextjs.vercel.app/api/getFbAccessToken?token=${response.authResponse.accessToken}`
      ).then((response) => console.log("got a response",response));
    },
    {
      scope: 'public_profile',
    }
    );} else {
      console.error("FB sdk not initialized")
    }
    
  };


  return (
    <>
      <HomeHero />
      <HeroContent />
      <ReviewCarousel reviews= { reviews }/>
      <MetaHead description="Gespecialiseerd in het kleuren van haar. Lived-in balayage, faceframing, highlights, blonde & brunettes. Haircuts voor mannen & vrouwen." />
      <button className="p-8 bg-blue-500" onClick={fbLogin}>Log in fb</button>
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

