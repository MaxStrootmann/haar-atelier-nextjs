import { HardcodedCategories } from "pages/shop";
import CategoryCard from "./CategoryCard";
import Link from "next/link";

export default function CategoriesGrid({
  sort,
  currentCategory,
  hardCodedCategories,
}: {
  sort: string;
  currentCategory: string;
  hardCodedCategories: HardcodedCategories;
}) {
  return (
    <div className="mx-auto text-center pt-8">
      <h2 className="text-3xl md:text-4xl">Categorieën</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 pt-8 gap-x-4 gap-y-6 w-max mx-auto">
        {hardCodedCategories.map((hcc) => (
          <Link
            scroll={false}
            key={hcc.id}
            href={`?category=${hcc.name.replace(/\s+/g, "-").replace(/&/g, "and")}${sort}#producten`}
          >
            <CategoryCard name={hcc.name} image={hcc.image} />
          </Link>
        ))}
      </div>
    </div>
  );
}
