import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const CategoriesDropdown = ({
  sort,
  selected,
  setSelected,
  currentCategory,
  categories,
}: {
  sort: string;
  selected: string;
  setSelected: React.Dispatch<any>;
  currentCategory: string;
  categories: string[];
}) => {
  return (
    <div className="">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative text-sm shadow-sm bg-bg-300 w-full cursor-default rounded-lg py-2 pl-2 pr-7 text-left ring-1 ring-black ring-opacity-5 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{currentCategory}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 rounded-xl mt-1 w-full md:w-max bg-bg-300 py-1 text-sm shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {categories.map((category, index) => (
                <Link
                  scroll={false}
                  key={index}
                  href={`?category=${category.replace(/\s+/g, "-").replace(/&/g, "and")}${sort}`}
                >
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 px-3 ${
                        active ? "bg-accent-500 text-white" : "text-gray-900"
                      }`
                    }
                    value={category}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                        >
                          {category}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                </Link>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CategoriesDropdown;
