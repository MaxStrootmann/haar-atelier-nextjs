import { getPayloadClient } from '../client'
import { payloadReviewToSanityShape } from '../compat/sanity-shapes'

export const getPayloadReviews = async () => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'reviews',
    depth: 1,
    limit: 100,
    sort: 'sortOrder',
    where: { published: { equals: true } },
  })

  return result.docs.map(payloadReviewToSanityShape)
}
