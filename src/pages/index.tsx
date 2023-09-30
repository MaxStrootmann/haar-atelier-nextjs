import { CategorySchema, ReviewSchema } from "lib/interfaces/schema";
import MetaHead from "components/MetaHead";
import HomeHero from "components/Home/HomeHero";
import HeroContent from "components/Home/HeroContent";
import { GetStaticProps } from "next";
import client from "lib/sanity/client";
import reviewsQuery from "lib/sanity/queries/reviews";
import ReviewCarousel from "components/Home/ReviewCarousel";
import { v4 as uuidv4 } from "uuid";
import urlFor from "lib/sanity/urlFor";

interface HomeProps {
  categories: CategorySchema[];
  reviews: ReviewSchema[];
}

const Home: React.FC<HomeProps> = ({ categories, reviews }) => {
  const fbLogin = () => {
    if (window.FB) {
      window.FB.login(
        (response) => {
          console.log(response.authResponse.accessToken);
          fetch(
            `https://haar-atelier-nextjs.vercel.app/api/getFbAccessToken?token=${response.authResponse.accessToken}`
          ).then((response) => console.log("got a response", response));
        },
        {
          scope: "public_profile",
        }
      );
    } else {
      console.error("FB sdk not initialized");
    }
  };

  // Inside your index.js or index.tsx
  async function fetchFormattedJSON() {
    const response = await fetch("/api/formatJSON");
    const data = await response.json();
    console.log(data);
  }

  async function updateIds() {
    try {
      const response = await fetch('/api/updateProductIds', {
        method: 'POST'
      });
      
      const data = await response.json();
  
      if (response.ok) {
        console.log(data.message);
      } else {
        console.error('Failed to update product IDs:', data.message);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }
  

  return (
    <>
      <MetaHead description="Gespecialiseerd in het kleuren van haar. Lived-in balayage, faceframing, highlights, blonde & brunettes. Haircuts voor mannen & vrouwen." />
      <HomeHero />
      <HeroContent />
      <div id="reviews">
        <ReviewCarousel reviews={reviews} />
      </div>

      {/* <button className="underline" onClick={fetchFormattedJSON}>
        upload
      </button> */}
      {/* <button className="underline" onClick={updateIds}>
        updateIds
      </button> */}
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
    revalidate: 60*60*24,
  };
};

export default Home;
