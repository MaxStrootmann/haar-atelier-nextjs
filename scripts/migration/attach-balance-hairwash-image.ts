import path from 'node:path'

import { getPayloadClient } from '../../src/lib/payload/client'

const imageUrl =
  'https://cdn-knefp.nitrocdn.com/IdgjgHpggaVrxseabywHAZTzbTiaAUPQ/assets/images/optimized/rev-c0acdc8/www.natulique.com/wp-content/uploads/2025/04/NATULIQUE_BALANCE_HAIRWASH_250ML_1500x1500px-1024x1024.png'
const imagePath = '/tmp/haar-balance/balance-hairwash.png'
const sourceKey = 'external:natulique-balance-hairwash-250ml'

async function main() {
  const payload = await getPayloadClient()

  const existingMedia = await payload.find({
    collection: 'media',
    limit: 1,
    where: { sanityAssetRef: { equals: sourceKey } },
  })

  const media = existingMedia.docs[0] || await payload.create({
    collection: 'media',
    data: {
      alt: 'Natulique Balance Hairwash 250ml',
      sanityAssetRef: sourceKey,
      source: {
        sanityAssetRef: sourceKey,
        sanityCdnUrl: imageUrl,
        originalFilename: path.basename(imagePath),
      },
    },
    filePath: imagePath,
  })

  const productResult = await payload.find({
    collection: 'products',
    limit: 1,
    where: { slug: { equals: 'natulique-balance-hairwash' } },
  })

  const product = productResult.docs[0]
  if (!product) throw new Error('Product not found: natulique-balance-hairwash')

  await payload.update({
    collection: 'products',
    id: product.id,
    data: { featuredImage: media.id },
  })

  console.log(`Attached media ${media.id} to ${product.slug}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
