import { buildMediaManifest } from '../../src/lib/migration/mediaManifest'
import { fetchSanitySnapshot, snapshotCounts } from '../../src/lib/migration/sanitySnapshot'
import { portableTextToLexical } from '../../src/lib/migration/portableTextToLexical'

type JsonObject = Record<string, any>

const slugValue = (slug: unknown) => {
  if (typeof slug === 'string') return slug
  if (slug && typeof slug === 'object' && 'current' in slug) return String((slug as JsonObject).current)
  return null
}

const main = async () => {
  const snapshot = await fetchSanitySnapshot()
  const counts = snapshotCounts(snapshot)
  const mediaManifest = buildMediaManifest(Object.values(snapshot).flat())
  const products = snapshot.product as JsonObject[]
  const reviews = snapshot.review as JsonObject[]
  const priceGroups = snapshot.prices as JsonObject[]

  const brands = Array.from(new Set(products.map((product) => product.brand).filter(Boolean).map(String))).sort()
  const productSlugs = products.map((product) => slugValue(product.slug)).filter(Boolean)
  const duplicateProductSlugs = productSlugs.filter((slug, index) => productSlugs.indexOf(slug) !== index)
  const productCategories = Array.from(new Set(products.map((product) => product.category).filter(Boolean).map(String))).sort()

  const lexicalSamples = {
    productDescription: products[0]?.description ? portableTextToLexical(products[0].description) : null,
    reviewBody: reviews[0]?.inhoud ? portableTextToLexical(reviews[0].inhoud) : null,
  }

  console.log(
    JSON.stringify(
      {
        mode: 'dry-run',
        writes: 0,
        counts,
        derived: {
          brands,
          productCategories,
          duplicateProductSlugs,
          uniqueImageRefs: mediaManifest.length,
          priceGroups: priceGroups.length,
          reviews: reviews.length,
          products: products.length,
        },
        lexicalSamples,
      },
      null,
      2,
    ),
  )
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
