import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { CategorySchema, ProductSchema } from "lib/interfaces";
import { ArrowLeftIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Image from "next/legacy/image";
import urlFor from "lib/sanity/urlFor";
import Link from "next/link";

interface MyComboBoxProps {
  categories: CategorySchema[];
  products: ProductSchema[];
}

const MyComboBox: React.FC<MyComboBoxProps> = ({
  categories = [],
  products = [],
}) => {
  const [selected, setSelected] = useState<CategorySchema>(
    categories[0] || null
  );
  const [query, setQuery] = useState("");

  const filteredCategories =
    query === ""
      ? categories
      : categories.filter((category) =>
          category.title
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="z-30 w-[calc(100%-2rem)] fixed m-4">
      <div className="relative">
        <Combobox value={selected} onChange={setSelected}>
          {({}) => (
            <>
              <div className="relative w-full rounded-2xl cursor-default overflow-hidden bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                  className=" bg-grey-300 w-[calc(100%-2rem)] rounded-xl m-4 border-none py-4 pl-8 text-base leading-5 text-gray-900 focus:ring-0"
                  placeholder="Waar ben je naar opzoek"
                  onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-4 flex items-center pr-2">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-800"
                    aria-hidden="true"
                  />
                </Combobox.Button>
                <Combobox.Button className="absolute inset-y-0 left-4 flex items-center pl-2">
                  <ArrowLeftIcon
                    className="h-5 w-5 text-gray-800"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Combobox.Options
                static
                className="absolute mt-2 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                {filteredCategories.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Geen resultaat.
                  </div>
                ) : (
                  <>
                    <h2 className="font-bold ml-6 my-2">Categorieën</h2>
                    {filteredCategories.map((category) => (
                      (<Link key={category._id} href={`/category/${category.slug}`}>

                        <Combobox.Option
                          key={category._id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-6 pr-4 flex items-center ${
                              active
                                ? "bg-grey-300 text-black"
                                : "text-grey-500"
                            }`
                          }
                          value={category}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex-shrink-0 relative w-12 h-12">
                                {" "}
                                {/* Adjust width and height as needed */}
                                <Image
                                  src={urlFor(category.featured_image).url()}
                                  alt={category.title}
                                  quality={100}
                                  layout="fill"
                                  objectFit="cover" // This ensures the image covers the div without distorting its aspect ratio
                                />
                              </div>
                              <span
                                className={`block truncate ml-2 ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {category.title}
                              </span>

                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? "text-white" : "text-teal-600"
                                  }`}
                                ></span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>

                      </Link>)
                    ))}
                  </>
                )}
              </Combobox.Options>
            </>
          )}
        </Combobox>
      </div>
    </div>
  );
};

export default MyComboBox;
