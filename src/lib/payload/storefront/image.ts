import type { Media } from '../../../payload-types'

import type { StorefrontImage } from './types'

export const isPayloadMedia = (value: unknown): value is Media => {
  return Boolean(value && typeof value === 'object' && 'id' in value)
}

export const payloadMediaToStorefrontImage = (media: unknown): StorefrontImage | null => {
  if (!isPayloadMedia(media)) return null

  return {
    id: String(media.id),
    url: media.url || null,
    alt: media.alt || media.filename || '',
    width: media.width,
    height: media.height,
  }
}

export const absoluteStorefrontImageUrl = (url: string | null | undefined, origin: string | undefined): string | null => {
  if (!url) return null
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  if (!origin) return url
  return `${origin}${url.startsWith('/') ? '' : '/'}${url}`
}
