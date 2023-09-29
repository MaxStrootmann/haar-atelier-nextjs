import { GetStaticProps } from "next";
import client from "lib/sanity/client";
import { CategorySchema, ProductSchema } from "lib/interfaces/schema";
import MetaHead from "components/MetaHead";
import WebshopHero from "components/Shop/WebshopHero";
import popularProductsQuery from "lib/sanity/queries/popular_products";
import PopularProductCarousel from "components/Shop/PopularProductCarousel";

interface ShopProps {
  products: ProductSchema[];
  popularProducts: ProductSchema[];
  categories: CategorySchema[];
}

const Shop: React.FC<ShopProps> = ({ popularProducts }) => {
  return (
    <>
      <MetaHead description="Producten van Natulique, Naturign en Lykkegaard nu te bestellen via de webshop van Haar Atelier Alkmaar" />
      <div className="mb-8">
        <WebshopHero />
      </div>
      <PopularProductCarousel products={popularProducts} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const popularProducts = await client.fetch(popularProductsQuery);

    if (!popularProducts) {
      throw Error("Data is null or undefined.");
    }

    return {
      props: { popularProducts },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data from Sanity.");
  }
};


export default Shop;
