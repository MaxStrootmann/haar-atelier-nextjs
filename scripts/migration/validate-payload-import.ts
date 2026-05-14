import { fetchSanitySnapshot, snapshotCounts } from '../../src/lib/migration/sanitySnapshot'

type JsonObject = Record<string, any>

const nativeImport = new Function('specifier', 'return import(specifier)') as <T>(specifier: string) => Promise<T>

const slugValue = (slug: unknown) => {
  if (typeof slug === 'string') return slug
  if (slug && typeof slug === 'object' && 'current' in slug) return String((slug as JsonObject).current)
  return ''
}

const main = async () => {
  const [{ getPayload }, { default: config }] = await Promise.all([
    nativeImport<typeof import('payload')>('payload'),
    nativeImport<typeof import('../../src/payload.config')>('../../src/payload.config.ts'),
  ])
  const payload = await getPayload({ config })
  const snapshot = await fetchSanitySnapshot()
  const sourceCounts = snapshotCounts(snapshot)

  const [media, brands, products, priceGroups, reviews] = await Promise.all([
    payload.find({ collection: 'media', depth: 0, limit: 1000 }),
    payload.find({ collection: 'brands', depth: 0, limit: 1000 }),
    payload.find({ collection: 'products', depth: 0, limit: 1000 }),
    payload.find({ collection: 'price-groups', depth: 0, limit: 1000 }),
    payload.find({ collection: 'reviews', depth: 0, limit: 1000 }),
  ])

  const sourceProducts = snapshot.product as JsonObject[]
  const sourceProductSlugs = sourceProducts.map((product) => slugValue(product.slug)).filter(Boolean).sort()
  const payloadProductSlugs = products.docs.map((product: JsonObject) => product.slug).filter(Boolean).sort()
  const missingPayloadSlugs = sourceProductSlugs.filter((slug) => !payloadProductSlugs.includes(slug))
  const extraPayloadSlugs = payloadProductSlugs.filter((slug) => !sourceProductSlugs.includes(slug))

  const sourceCategories = Array.from(new Set(sourceProducts.map((product) => product.category).filter(Boolean))).sort()
  const payloadCategories = Array.from(new Set(products.docs.map((product: JsonObject) => product.category).filter(Boolean))).sort()

  const productsWithoutFeaturedImage = products.docs
    .filter((product: JsonObject) => !product.featuredImage)
    .map((product: JsonObject) => ({ id: product.sourceId, name: product.name, slug: product.slug }))

  const summary = {
    sourceCounts,
    payloadCounts: {
      media: media.totalDocs,
      brands: brands.totalDocs,
      products: products.totalDocs,
      priceGroups: priceGroups.totalDocs,
      reviews: reviews.totalDocs,
    },
    parity: {
      productCountMatches: sourceCounts.product === products.totalDocs,
      reviewCountMatches: sourceCounts.review === reviews.totalDocs,
      priceGroupCountMatches: sourceCounts.prices === priceGroups.totalDocs,
      missingPayloadSlugs,
      extraPayloadSlugs,
      sourceCategories,
      payloadCategories,
      categoriesMatch: JSON.stringify(sourceCategories) === JSON.stringify(payloadCategories),
      productsWithoutFeaturedImage,
    },
  }

  console.log(JSON.stringify(summary, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error)
    process.exit(1)
  })
