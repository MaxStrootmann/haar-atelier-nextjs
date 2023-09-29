import React from 'react'
import Pagination from './Pagination'
import { ProductSchema } from 'lib/interfaces'
import CategoriesDropdown from 'components/Shop/CategoriesDropdown'

type PageProps = {
  products: ProductSchema[]
  currentPage: number
  totalProducts: number
  perPage: number
  categories: any[]
}

const ProductCard = ({ name, price, description }: any) => (
  <div className="my-10 border-2 border-sky-500 p-3">
    <h2>{name}</h2>
    <h3>
      ${price}
    </h3>
    <p>
      {/* {description} */}
    </p>
  </div>
)

const PaginationPage = ({
  currentPage,
  totalProducts,
  perPage,
  products,
  categories
}: PageProps): JSX.Element => {
  return (
    <div>
      <h1>Page {currentPage}</h1>
      <CategoriesDropdown categories={categories} />
      <Pagination
        totalItems={totalProducts}
        currentPage={currentPage}
        itemsPerPage={perPage}
        renderPageLink={(page, lastId) => `/category/${page}?lastId=${lastId}`}
      />
      <div className="grid grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </div>
  )
}

export default PaginationPage