import type { Brand, Product } from '../../../payload-types'

import { getPayloadClient } from '../client'
import { payloadMediaToStorefrontImage } from './image'
import type { StorefrontProduct, StorefrontProductSort } from './types'

const sortToPayload = (sort: StorefrontProductSort) => {
  if (sort === 'price asc') return 'price'
  if (sort === 'price desc') return '-price'
  return '-popularity'
}

const relationshipTitle = (brand: Product['brand']): string | null => {
  if (!brand || typeof brand === 'number') return null
  return (brand as Brand).title || null
}

export const payloadProductToStorefrontProduct = (product: Product): StorefrontProduct => ({
  id: String(product.id),
  name: product.name,
  slug: product.slug,
  description: product.description || product.rawPortableTextDescription || null,
  image: payloadMediaToStorefrontImage(product.featuredImage),
  secondaryImages: (product.secondaryImages || [])
    .map((row) => payloadMediaToStorefrontImage(row.image))
    .filter((image): image is NonNullable<typeof image> => Boolean(image)),
  price: product.price,
  currency: product.currency,
  inStock: product.inStock ?? true,
  category: product.category,
  brandTitle: relationshipTitle(product.brand) || product.legacyBrandLabel || null,
  popularity: product.popularity ?? 0,
})

export const getStorefrontProducts = async ({
  category,
  limit = 200,
  sort = 'popularity desc',
}: {
  category?: string
  limit?: number
  sort?: StorefrontProductSort
} = {}): Promise<StorefrontProduct[]> => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    depth: 1,
    limit,
    sort: sortToPayload(sort),
    where: category && category !== 'Alle producten' ? { category: { equals: category } } : undefined,
  })

  return result.docs.map(payloadProductToStorefrontProduct)
}

export const getStorefrontProductBySlug = async (slug: string): Promise<StorefrontProduct | null> => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 1,
    where: { slug: { equals: slug } },
  })

  const product = result.docs[0]
  return product ? payloadProductToStorefrontProduct(product) : null
}

export const getStorefrontProductSlugs = async () => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    depth: 0,
    limit: 200,
  })

  return result.docs.map((product) => ({ slug: product.slug })).filter((product) => product.slug)
}

export const getStorefrontProductCategories = async () => {
  const products = await getStorefrontProducts({ limit: 200 })
  const categories = Array.from(new Set(products.map((product) => product.category).filter(Boolean)))
  categories.push('Alle producten')
  return categories
}
