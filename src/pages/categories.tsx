import CategoriesDropdown from "components/CategoriesPage/CategoriesDropdown";
import ProductCard from "components/ProductList/ProductCard";
import { Logo_Natulique } from "lib/icons";
import { CategorySchema, ProductSchema } from "lib/interfaces";
import client from "lib/sanity/client";
import categoriesQuery from "lib/sanity/queries/categories";
import popularProductsQuery from "lib/sanity/queries/popular_products";
import { GetStaticProps } from "next";
import Image from "next/image";
import { useEffect } from "react";

interface CategoriesPageProps {
  categories: CategorySchema[];
  products: ProductSchema[];
}

const CategoriesPage: React.FC<CategoriesPageProps> = ({categories, products}) => {

  useEffect(() => {
    console.log(products);
  }, []);

  return (
    <div className="px-8 pb-48 pt-10 space-y-8">
      <div className="flex justify-center">
        <Image
          src={Logo_Natulique}
          alt="Natulique Logo"
          width={67 * 3}
          height={36 * 3}
        />
      </div>
      <p className="text-center font-serif">
        Zorgvuldig geselecteerde plantaardige ingrediënten, die niet schadelijk
        zijn voor jou of het milieu. Vrij van microplastics, synthetische geur-
        en kleurstoffen, vulmiddelen, dierproeven, kinderarbeid en moderne
        slavernij.
      </p>
      <div className="flex justify-between pt-4">
        <div><h2 className="text-sm font-sans pl-">Categorieën:</h2><CategoriesDropdown categories={categories}/></div>
        <div><h2 className="text-sm font-sans pl-">Sorteren op:</h2><CategoriesDropdown categories={categories}/></div>
      </div>
      <div
          className="flex overflow-x-auto py-4 gap-4 ml-4"
        >
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
    </div>
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

export default CategoriesPage;
