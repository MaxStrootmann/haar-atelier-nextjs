import type { Review } from '../../../payload-types'

import { getPayloadClient } from '../client'
import { payloadMediaToStorefrontImage } from './image'
import type { StorefrontReview } from './types'

export const payloadReviewToStorefrontReview = (review: Review): StorefrontReview => ({
  id: String(review.id),
  name: review.name,
  body: review.body || review.rawPortableTextBody || null,
  photo: payloadMediaToStorefrontImage(review.photo),
  sortOrder: review.sortOrder ?? 0,
  published: review.published ?? true,
})

export const getStorefrontReviews = async (): Promise<StorefrontReview[]> => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'reviews',
    depth: 1,
    limit: 100,
    sort: 'sortOrder',
    where: { published: { equals: true } },
  })

  return result.docs.map(payloadReviewToStorefrontReview)
}
