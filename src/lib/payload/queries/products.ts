import { getPayloadClient } from '../client'
import { payloadProductToSanityShape } from '../compat/sanity-shapes'

export const getPayloadProducts = async () => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 200,
    sort: '-popularity',
  })

  return result.docs.map(payloadProductToSanityShape)
}

export const getPayloadProductBySlug = async (slug: string) => {
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
