import type { ProductSchema, ReviewSchema } from '../../interfaces/schema'

type PayloadMedia = {
  id?: string
  url?: string | null
  filename?: string | null
  source?: {
    sanityAssetRef?: string | null
  }
}

type PayloadProduct = Record<string, any>
type PayloadReview = Record<string, any>

export const payloadMediaToSanityImage = (media: PayloadMedia | string | number | null | undefined) => {
  if (!media || typeof media === 'string' || typeof media === 'number') return null

  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: media.source?.sanityAssetRef || String(media.id || media.filename || ''),
    },
  }
}

export const payloadProductToSanityShape = (product: PayloadProduct): ProductSchema => ({
  _id: String(product.source?.id || product.id),
  name: product.name,
  slug: product.slug,
  description: product.rawPortableTextDescription || [],
  featured_image: payloadMediaToSanityImage(product.featuredImage) as ProductSchema['featured_image'],
  price: product.price,
  in_stock: Boolean(product.inStock),
  popularity: product.popularity || 0,
  subcategories: [
    {
      title: product.category,
      slug: product.category,
    },
  ],
})

export const payloadReviewToSanityShape = (review: PayloadReview): ReviewSchema => ({
  _id: String(review.source?.id || review.id),
  name: review.name,
  inhoud: review.rawPortableTextBody || [],
  foto: payloadMediaToSanityImage(review.photo) as ReviewSchema['foto'],
})
