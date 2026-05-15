export type StorefrontImage = {
  id: string
  url: string | null
  alt: string
  width?: number | null
  height?: number | null
}

export type StorefrontProduct = {
  id: string
  name: string
  slug: string
  description: unknown
  image: StorefrontImage | null
  secondaryImages: StorefrontImage[]
  price: number
  currency: 'EUR'
  inStock: boolean
  category: string
  brandTitle?: string | null
  popularity: number
}

export type StorefrontReview = {
  id: string
  name: string
  body: unknown
  photo: StorefrontImage | null
  sortOrder: number
  published: boolean
}

export type StorefrontPriceGroup = {
  id: string
  category: string
  slug: string
  conditions?: string | null
  sortOrder: number
  treatments: Array<{
    id: string
    name: string
    conditions?: string | null
    price: string
  }>
}

export type StorefrontProductSort = 'price asc' | 'price desc' | 'popularity desc'
