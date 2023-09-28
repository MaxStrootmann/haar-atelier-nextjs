import { GetStaticProps } from 'next'
import { PER_PAGE } from './[page]'
import PaginationPage from 'components/Pagination/PaginatedPage'
import groq from 'groq'
import client from 'lib/sanity/client'

function Category({ products, totalProducts, currentPage, lastId }: any) {
  console.log("lastId in index:", lastId)
  return (
    <div>
      <PaginationPage
        products={products}
        currentPage={currentPage}
        totalProducts={totalProducts}
        perPage={PER_PAGE}
        lastId={lastId}
      />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const query = groq`
  *[_type == "product"] | order(popularity desc) [0...$limit] {
    _id,
    name,
    featured_image,
    price,
    in_stock,
  }`;
  const total = groq`count(*[_type == "product"])`;
  const products = await client.fetch(query, { limit: PER_PAGE })
  const totalProducts = await client.fetch(total);
  let lastId = '';

  if (!products.length) {
    return {
      notFound: true,
    }
  } else if (products.length > 0) {
    lastId = products[products.length - 1]._id;
  } else {
    lastId = ''; //reaches the end
  }
  return {
    props: {
      products,
      totalProducts,
      currentPage: 1,
      lastId
    },
  }
}


export default Category