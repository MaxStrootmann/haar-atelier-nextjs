import type { ProductSchema } from '../../interfaces/schema'

import { getPayloadClient } from '../client'
import { payloadProductToSanityShape } from '../compat/sanity-shapes'

type SortOption = 'price asc' | 'price desc' | 'popularity desc'

const sortToPayload = (sort: SortOption) => {
  if (sort === 'price asc') return 'price'
  if (sort === 'price desc') return '-price'
  return '-popularity'
}

export const getPayloadProducts = async ({
  category,
  limit = 200,
  sort = 'popularity desc',
}: {
  category?: string
  limit?: number
  sort?: SortOption
} = {}): Promise<ProductSchema[]> => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    depth: 1,
    limit,
    sort: sortToPayload(sort),
    where: category && category !== 'Alle producten' ? { category: { equals: category } } : undefined,
  })

  return result.docs.map(payloadProductToSanityShape)
}

export const getPayloadProductBySlug = async (slug: string): Promise<ProductSchema | null> => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 1,
    where: { slug: { equals: slug } },
  })

  const product = result.docs[0]
  return product ? payloadProductToSanityShape(product) : null
}

export const getPayloadProductSlugs = async () => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    depth: 0,
    limit: 200,
  })

  return result.docs.map((product) => ({ slug: product.slug })).filter((product) => product.slug)
}

export const getPayloadProductCategories = async () => {
  const products = await getPayloadProducts({ limit: 200 })
  const categories = Array.from(new Set(products.map((product) => product.subcategories?.[0]?.title).filter(Boolean)))
  categories.push('Alle producten')
  return categories
}
