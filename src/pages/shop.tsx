import { GetStaticProps } from "next";
import client from "lib/sanity/client";
import { CategorySchema, ProductSchema } from "lib/interfaces/schema";
import MetaHead from "components/MetaHead";
import WebshopHero from "components/Shop/WebshopHero";
import popularProductsQuery from "lib/sanity/queries/popular_products";
import allProductsQuery from "lib/sanity/queries/allProducts";
import categoriesQuery from "lib/sanity/queries/categories";
import PopularProductCarousel from "components/Shop/PopularProductCarousel";
import ProductsByCategory from "components/Shop/ProductsByCategory";

interface ShopProps {
  products: ProductSchema[];
  popularProducts: ProductSchema[];
  categories: CategorySchema[];
}

const Shop: React.FC<ShopProps> = ({ products, popularProducts, categories }) => {
  return (
    <>
      <MetaHead description="Producten van Natulique, Naturign en Lykkegaard nu te bestellen via de webshop van Haar Atelier Alkmaar" />
      <div className="mb-8">
        <WebshopHero />
      </div>
      <PopularProductCarousel products={popularProducts} />
      <ProductsByCategory products={products} categories={categories} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await client.fetch(allProductsQuery);
  const popularProducts = await client.fetch(popularProductsQuery);
  const categories = await client.fetch(categoriesQuery);

  if (!popularProducts || !products || !categories) {
    throw Error("Sorry, something went wrong.");
  }

  return {
    props: { products, popularProducts, categories },
    revalidate: 60,
  };
};

export default Shop;
