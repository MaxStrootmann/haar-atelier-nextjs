import { useContext, useState } from "react";
import { Combobox } from "@headlessui/react";
import { ProductSchema } from "lib/interfaces";
import { ArrowLeftIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Image from "next/legacy/image";
import urlFor from "lib/sanity/urlFor";
import Link from "next/link";
import SearchVisibilityContext from "contexts/searchVisibilityContext";

interface MyComboBoxProps {
  products: ProductSchema[];
  categories?: any[];
}

const MyComboBox: React.FC<MyComboBoxProps> = ({
  products = [],
  categories = [],
}) => {
  const [selected, setSelected] = useState<ProductSchema>(products[0] || null);

  const [query, setQuery] = useState("");

  const { searchVisibility, toggleSearchVisibility } = useContext(
    SearchVisibilityContext
  );

  const menuItems = [
    { _id: "1", name: "Home" },
    { _id: "2", name: "Shop" },
    { _id: "3", name: "Reviews" },
    { _id: "4", name: "Tarieven" },
    { _id: "5", name: "Contact" },
  ];

  const filteredProducts =
    query === ""
      ? []
      : products.filter((product) =>
          product.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="z-30 w-[calc(100%-2rem)] fixed m-4 md:w-96 md:right-0">
      <div className="relative">
        <Combobox value={selected} onChange={setSelected}>
          {({}) => (
            <>
              <div className="relative w-full rounded-2xl cursor-default overflow-hidden bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                  className=" bg-grey-300 w-[calc(100%-2rem)] rounded-xl m-4 border-none py-4 pl-8 text-base leading-5 text-gray-900 focus:ring-0"
                  placeholder="Welk product zoek je?"
                  onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-4 flex items-center pr-2">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-800"
                    aria-hidden="true"
                  />
                </Combobox.Button>
                <Combobox.Button
                  className="absolute inset-y-0 left-4 flex items-center pl-2"
                  onClick={toggleSearchVisibility}
                >
                  <ArrowLeftIcon
                    className="h-5 w-5 text-gray-800"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Combobox.Options
                static
                className="absolute overflow-y-auto mt-2 w-full rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                {!query && <h2 className="font-bold ml-6 my-2">Menu</h2>}
                {!query &&
                  menuItems.map((item) => (
                    <Link
                      key={`${item._id}`}
                      href={`/${item.name.toLowerCase()}`}
                    >
                      <Combobox.Option
                        key={`${item._id}`}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-6 pr-4 flex items-center ${
                            active ? "bg-grey-300 text-black" : "text-grey-500"
                          }`
                        }
                        value={item}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ml-2 ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {item.name}
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
                    </Link>
                  ))}
                {!query && (
                    <div className="mx-auto w-[calc(100%-3rem)] md:w-80">
                      <Link
                        href={
                          "https://widget2.meetaimy.com/widgetWeb?salonId=MTIzNjkzMA%3D%3D&salonEmail=aW5mb0BtYXJsb2Vzb3RqZXMtaGFhcmF0ZWxpZXIubmw%3D"
                        }
                      >
                        <div className="bg-accent-500 rounded-lg px-4 py-2 text-white text-center my-4">
                          Afspraak maken
                        </div>
                      </Link>
                    </div>
                )}
                {filteredProducts.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Geen resultaat.
                  </div>
                ) : (
                  <>
                    {filteredProducts.map((product) => (
                      <Link
                        key={`${product._id}`}
                        href={`/product/${product.slug}`}
                        onClick={toggleSearchVisibility}
                      >
                        <Combobox.Option
                          key={`${product._id}`}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-6 pr-4 flex items-center ${
                              active
                                ? "bg-grey-300 text-black"
                                : "text-grey-500"
                            }`
                          }
                          value={product}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate ml-2 ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {product.name}
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
                      </Link>
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
