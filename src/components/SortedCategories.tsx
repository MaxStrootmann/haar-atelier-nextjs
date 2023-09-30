import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "./Shop/ProductCard";
import { ProductSchema } from "lib/interfaces";
import client from "lib/sanity/client";
import groq from "groq";


interface Props {
  categories: any[]
  products: ProductSchema[]
}

export default function SortedCategories({ categories, products }: Props) {

 const [displayedProducts, setDisplayedProducts] = useState<ProductSchema[]>(products);

 const handleScroll = async () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1500) {
    // Fetch next set of products
    const newProducts = await client.fetch(groq`*[_type == "product"][${
      displayedProducts.length
    }...${displayedProducts.length + 10}]`);
    setDisplayedProducts([...displayedProducts, ...newProducts]);
  }
};

useEffect(() => {
  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [displayedProducts, handleScroll]);

 const router = useRouter();
 
 const handleChange = (selectedCategory: any) => {
  const urlCategory = selectedCategory.replace(/\s+/g, '-')
  router.replace(`?category=${urlCategory}`);
 }

 console.log("displayedProducts:", displayedProducts.length)
  return (
    <div>
      <h1>Sorted Categories</h1>
      {categories.map((category) => <button className="p-4 bg-accent-500 m-4" onClick={() => (handleChange(category))} key={category.id}>{category}</button>)}
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-3 lg:gap-x-8">
        {displayedProducts.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}