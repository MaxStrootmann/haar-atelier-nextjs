import { GetStaticProps } from "next";
import client from "lib/sanity/client";
import categoriesQuery from "lib/sanity/queries/categories";
import { CategorySchema, ProductSchema } from "lib/interfaces/schema";
import MetaHead from "components/MetaHead";
import WebshopHero from "components/Hero/WebshopHero";
import ProductCarousel from "components/ProductList/ProductCarousel";
import popularProductsQuery from "lib/sanity/queries/popular_products";

interface HomeProps {
  categories: CategorySchema[];
  products: ProductSchema[];
}

const Home: React.FC<HomeProps> = ({ categories, products }) => {
  return (
    <>
      <MetaHead description="Gespecialiseerd in het kleuren van haar. Lived-in balayage, faceframing, highlights, blonde & brunettes. Haircuts voor mannen & vrouwen." />
      <div className="mb-8">
        <WebshopHero />
      </div>
      <ProductCarousel products={products} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const categories = await client.fetch(categoriesQuery);
  const popularProducts = await client.fetch(popularProductsQuery);

  if (!categories || !popularProducts) {
    throw Error("Sorry, something went wrong.");
  }

  return {
    props: { categories, products: popularProducts },
    revalidate: 60,
  };
};

export default Home;
