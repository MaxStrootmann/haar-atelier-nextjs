import usePagination from "hooks/usePagination";
import Link from "next/link";
import React from "react";

export type PaginationProps = {
  totalItems: number;
  currentPage: number;
  renderPageLink: (page: number, lastId: string) => string;
  itemsPerPage?: number;
  lastId?: string;
};

export const dotts = "...";

const Pagination = ({
  totalItems,
  currentPage,
  itemsPerPage = 10,
  renderPageLink,
  lastId,
}: PaginationProps) => {
  const pages = usePagination(totalItems, currentPage, itemsPerPage);
  console.log("lastId in Pagination:", lastId);

  return (
    <div className="flex items-center justify-center my-8">
      {pages.map((pageNumber, i) =>
        pageNumber === dotts ? (
          <span
            key={i}
            className="px-4 py-2 rounded-full text-sm font-semibold text-black"
          >
            {pageNumber}
          </span>
        ) : (
          <Link
            key={i}
            href={renderPageLink(pageNumber as number, lastId as string)}
            className={`${
              pageNumber === currentPage ? "text-success-dark" : "text-black"
            } px-4 py-2 mx-1 rounded-full text-sm font-semibold no-underline`}
          >
            {pageNumber}
          </Link>
        )
      )}
    </div>
  );
};

export default Pagination;
