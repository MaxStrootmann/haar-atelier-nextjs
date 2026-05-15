import MetaHead from "components/MetaHead";
import CategoriesDropdown from "components/Shop/CategoriesDropdown";
import CategoriesGrid from "components/Shop/CategoriesGrid";
import PopularProductCarousel from "components/Shop/PopularProductCarousel";
import ProductCard from "components/Shop/ProductCard";
import SortDropdown from "components/Shop/SortDropdown";
import WebshopHero from "components/Shop/WebshopHero";
import { Logo_Natulique } from "lib/icons";
import type { StorefrontProduct } from "lib/payload/storefront";
import {
  getStorefrontProductCategories,
  getStorefrontProducts,
} from "lib/payload/storefront";
import { hardCodedCategories } from "lib/shop/categories";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props {
  categories: any[];
  products: StorefrontProduct[];
  popularProducts: StorefrontProduct[];
}

export default function CategoriesPage({
  categories,
  products,
  popularProducts,
}: Props) {
  const [displayedProducts] = useState<StorefrontProduct[]>(products);
  const [selected, setSelected] = useState(categories[categories.length - 1]);
  let selectedSort = useSearchParams()?.get("sort") ?? "";
  let sort = selectedSort ? `&sort=${selectedSort}` : "";
  let currentCategory =
    useSearchParams()?.get("category")?.replace("-and-", " & ") ?? selected;

  return (
    <>
      <MetaHead
        title="Haar Atelier Alkmaar | Webshop"
        description="Shop NATULIQUE, Zorgvuldig geselecteerde plantaardige ingrediënten, die niet schadelijk zijn voor jou of het milieu."
      />
      <WebshopHero />
      <div className="pt-6 sm:hidden">
        <PopularProductCarousel products={popularProducts} />
      </div>
      <div className="px-4 space-y-8 py-8">
        <div className="flex justify-center">
          <Image
            src={Logo_Natulique}
            alt="Natulique Logo"
            width={67 * 3}
            height={36 * 3}
          />
        </div>
        <h1 className="hidden">Haar Atelier Alkmaar, webshop.</h1>
        <p className="text-center font-serif max-w-xl mx-auto">
          Zorgvuldig geselecteerde plantaardige ingrediënten, die niet
          schadelijk zijn voor jou of het milieu. Vrij van microplastics,
          synthetische geur- en kleurstoffen, vulmiddelen, dierproeven,
          kinderarbeid en moderne slavernij.
        </p>
      </div>
      <CategoriesGrid
        sort={sort}
        currentCategory={currentCategory}
        hardCodedCategories={hardCodedCategories}
      />
      <div className="px-4 sm:px-8 pb-48 pt-10 space-y-8 lg:max-w-screen-lg  mx-auto">
        <div
          id="producten"
          className="flex flex-col sm:flex-row justify-between pt-4"
        >
          <div>
            <h2 className="text-sm font-sans font-bold">Categorieën:</h2>
            <CategoriesDropdown
              sort={sort}
              selected={selected}
              setSelected={setSelected}
              currentCategory={currentCategory}
              categories={categories}
            />
          </div>
          <div className="pt-4 md:pt-0">
            <h2 className="text-sm font-sans font-bold">Sorteren op:</h2>
            <SortDropdown />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
          {displayedProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  let category =
    typeof context.query.category === "string"
      ? decodeURIComponent(context.query.category)
          .replace(/-/g, " ")
          .replace(/and/g, "&")
          .trim()
      : undefined;

  const sortFormat = () => {
    if (context.query.sort === "Prijs-laag-hoog") {
      return "price asc";
    } else if (context.query.sort === "Prijs-hoog-laag") {
      return "price desc";
    } else {
      return "popularity desc";
    }
  };

  const products = (await getStorefrontProducts({
    category,
    limit: 200,
    sort: sortFormat(),
  })).filter((product) => product.image?.url);
  const categories = await getStorefrontProductCategories();
  const popularProducts = (await getStorefrontProducts({ limit: 20, sort: "popularity desc" }))
    .filter((product) => product.image?.url)
    .slice(0, 10);

  return {
    props: {
      categories,
      products,
      popularProducts,
    },
  };
};
