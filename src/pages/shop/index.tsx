import MetaHead from "components/MetaHead";
import CategoriesDropdown from "components/Shop/CategoriesDropdown";
import CategoriesGrid from "components/Shop/CategoriesGrid";
import PopularProductCarousel from "components/Shop/PopularProductCarousel";
import ProductCard from "components/Shop/ProductCard";
import SortDropdown from "components/Shop/SortDropdown";
import WebshopHero from "components/Shop/WebshopHero";
import groq from "groq";
import { Logo_Natulique } from "lib/icons";
import { ProductSchema } from "lib/interfaces";
import client from "lib/sanity/client";
import popularProductsQuery from "lib/sanity/queries/popular_products";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  categories: any[];
  products: ProductSchema[];
  categoryFilter: string;
  sortOption: string;
  popularProducts: ProductSchema[];
}

export type HardcodedCategories = {
  id: number;
  name: string;
  image: string;
}[];

const hardCodedCategories: HardcodedCategories = [
  {
    id: 1,
    name: "Alle producten",
    image: "/categories/conditioner.png",
  },
  {
    id: 2,
    name: "Shampoo & Conditioners",
    image: "/categories/hairwash.png",
  },
  {
    id: 3,
    name: "Lichaamsverzorging",
    image: "/categories/lichaamsverzorging.png",
  },
  { id: 4, name: "Maskers & Colour Treatments", image: "/categories/mask.png" },
  { id: 5, name: "Versteviging & Styling", image: "/categories/styling.png" },
  {
    id: 6,
    name: "Verzorging & Bescherming",
    image: "/categories/bescherming.png",
  },
  { id: 7, name: "Accessoires", image: "/categories/accessoires.png" },
];

export default function CategoriesPage({
  categories,
  products,
  categoryFilter,
  sortOption,
  popularProducts,
}: Props) {
  const [displayedProducts, setDisplayedProducts] =
    useState<ProductSchema[]>(products);

  useEffect(() => {
    const handleScroll = async () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 1500
      ) {
        // Fetch next set of products
        const newProducts = await client.fetch(
          groq`*[_type == "product" ${categoryFilter}]${sortOption} [${displayedProducts.length}...${
            displayedProducts.length + 10
          }]{
            _id,
            name,
            "slug": slug.current,
            featured_image,
            price,
            in_stock,
            popularity
          }`,
        );
        setDisplayedProducts([...displayedProducts, ...newProducts]);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [categoryFilter, sortOption, displayedProducts]);

  useEffect(() => {
    async function fetchNewData() {
      const newProducts = await client.fetch(
        groq`*[_type == "product" ${categoryFilter}]${sortOption} [0...10]{
          _id,
          name,
          "slug": slug.current,
          featured_image,
          price,
          in_stock,
          popularity
        }`,
      );
      setDisplayedProducts(newProducts);
    }

    fetchNewData();
  }, [categoryFilter, sortOption]);

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
            <ProductCard product={product} key={product._id} />
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
  const categoryFilter =
    category && category !== "Alle producten"
      ? `&& category == "${category}"`
      : "";
  const sortFormat = () => {
    if (context.query.sort === "Prijs-laag-hoog") {
      return "price asc";
    } else if (context.query.sort === "Prijs-hoog-laag") {
      return "price desc";
    } else if (context.query.sort === "Populariteit") {
      return "popularity desc";
    } else {
      return "popularity desc";
    }
  };
  let sort = sortFormat();
  const sortOption = sort ? ` | order(${sort})` : "";

  const products = await client.fetch(
    groq`*[_type == "product" ${categoryFilter}]${sortOption} [0...10]{
      _id,
      name,
      "slug": slug.current,
      featured_image,
      price,
      in_stock,
      popularity
    }`,
  );
  const categories = await client.fetch(
    groq`array::unique(*[_type == "product"].category)`,
  );
  const popularProducts = await client.fetch(popularProductsQuery);

  categories.push("Alle producten");

  return {
    props: {
      categories,
      products,
      categoryFilter,
      sortOption,
      popularProducts,
    },
  };
};
