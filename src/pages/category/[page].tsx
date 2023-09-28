import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import React from 'react'
import Head from 'next/head'
import groq from 'groq'
import client from 'lib/sanity/client'
import PaginationPage from 'components/Pagination/PaginatedPage'
import { ProductSchema } from 'lib/interfaces'

type PageProps = {
  products: ProductSchema[]
  currentPage: number
  totalProducts: number
  lastId: string
}

export const PER_PAGE = 10

function PaginatedPage({ products, currentPage, totalProducts, lastId }: PageProps) {
  return (
    <div>
      <Head>
        <title>Page - SSG Pagination Example</title>
        <meta
          name="description"
          content={`Statically generated page ${currentPage}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const page = Number(params?.page) || 1
  let lastId = params?.lastId || '';
  let total = groq`count(*[_type == "product"])`;
  

  const query = groq`
  *[_type == "product" && _id > $lastId] | order(popularity desc)[0...$limit]`;
  const totalProducts = await client.fetch(total);
  const products = await client.fetch(query, { lastId, limit: PER_PAGE })
  

  if (!products.length) {
    return {
      notFound: true,
    }
  } else if (products.length > 0) {
    lastId = products[products.length - 1]._id;
  } else {
    lastId = ''; //reaches the end
  }

  console.log("lastId in [page]:", lastId)

  // Redirect the first page to `/category` to avoid duplicated content
  if (page === 1) {
    return {
      redirect: {
        destination: `/category?lastId=${lastId}`,
        permanent: false,
      },
    }
  }

  return {
    props: {
      products,
      totalProducts,
      currentPage: page,
      lastId
    },
    revalidate: 60 * 60 * 24, // <--- ISR cache: once a day
  }
}

export const getStaticPaths: GetStaticPaths = async (lastId) => {
  return {
    // Prerender the next 5 pages after the first page, which is handled by the index page.
    // Other pages will be prerendered at runtime.
    paths: Array.from({ length: 5 }).map((_, i) => `/category/${i + 2}?lastId=${lastId}`),
    // Block the request for non-generated pages and cache them in the background
    fallback: 'blocking',
  }
}

export default PaginatedPage