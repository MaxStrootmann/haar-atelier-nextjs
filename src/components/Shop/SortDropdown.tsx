import React from "react";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { sortToQueryValue } from "lib/shop/query";

const sortOptions = ["Populariteit", "Prijs laag-hoog", "Prijs hoog-laag"];

const SortDropdown = () => {
  const router = useRouter();
  const selectedSort = typeof router.query.sort === "string"
    ? sortOptions.find((option) => sortToQueryValue(option) === router.query.sort) || sortOptions[0]
    : sortOptions[0];

  const handleChange = (sort: string) => {
    const query = { ...router.query };

    if (sort === "Populariteit") {
      delete query.sort;
    } else {
      query.sort = sortToQueryValue(sort);
    }

    router.push({ pathname: "/shop", query }, undefined, { scroll: false });
  };

  return (
    <div className="">
      <Listbox value={selectedSort} onChange={handleChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative text-sm shadow-sm bg-bg-300 w-full cursor-default rounded-lg py-2 pl-2 pr-7 text-left ring-1 ring-black ring-opacity-5 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selectedSort}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 rounded-xl mt-1 max-h-60 w-full md:w-max overflow-auto bg-bg-300 py-1 text-sm shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {sortOptions.map((option) => (
              <Listbox.Option
                key={option}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 px-3 ${active ? "bg-accent-500 text-white" : "text-gray-900"}`
                }
                value={option}
              >
                {({ selected }) => (
                  <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{option}</span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};

export default SortDropdown;
