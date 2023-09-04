import { GetStaticProps } from "next";
import client from "lib/sanity/client";
import categoriesQuery from "lib/sanity/queries/categories";
import onSaleProductsQuery from "lib/sanity/queries/on_sale_products";
import { CategorySchema, ProductSchema } from "lib/interfaces/schema";
import MetaHead from "components/MetaHead";
import CategoryList from "components/CategoryList/CategoryList";
import ProductList from "components/ProductList/ProductList";
import WebshopHero from "components/Hero/WebshopHero";

interface HomeProps {
  categories: CategorySchema[];
  products: ProductSchema[];
}

const Home: React.FC<HomeProps> = ({ categories, products }) => {
  return (
    <>
      <MetaHead description="Gespecialiseerd in het kleuren van haar. Lived-in balayage, faceframing, highlights, blonde & brunettes. Haircuts voor mannen & vrouwen." />
      <WebshopHero />
      <div className="pt-[calc(100svh/2-2rem)] lg:pt-[calc(100svh/1.2-2rem)]"></div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const categories = await client.fetch(categoriesQuery);
  const onSaleProducts = await client.fetch(onSaleProductsQuery);

  if (!categories || !onSaleProducts) {
    throw Error("Sorry, something went wrong.");
  }

  return {
    props: { categories, products: onSaleProducts },
    revalidate: 60
  };
};

export default Home;
