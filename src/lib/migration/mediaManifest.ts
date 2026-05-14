type JsonObject = Record<string, unknown>

export type MediaManifestEntry = {
  sanityAssetRef: string
  sanityCdnUrl: string | null
  sourceDocuments: string[]
  targetPayloadMediaId: string | null
}

const assetRefPattern = /^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/

export const sanityImageUrlFromRef = (ref: string): string | null => {
  const match = ref.match(assetRefPattern)
  if (!match) return null
  const [, id, dimensions, extension] = match
  return `https://cdn.sanity.io/images/nc8y31kd/production/${id}-${dimensions}.${extension}`
}

const walk = (value: unknown, visit: (object: JsonObject) => void) => {
  if (Array.isArray(value)) {
    value.forEach((item) => walk(item, visit))
    return
  }

  if (value && typeof value === 'object') {
    const object = value as JsonObject
    visit(object)
    Object.values(object).forEach((nested) => walk(nested, visit))
  }
}

export const buildMediaManifest = (documents: unknown[]): MediaManifestEntry[] => {
  const entries = new Map<string, MediaManifestEntry>()

  for (const document of documents) {
    const sourceId =
      document && typeof document === 'object' && '_id' in document ? String((document as JsonObject)._id) : 'unknown'

    walk(document, (object) => {
      const asset = object.asset
      if (!asset || typeof asset !== 'object' || !('_ref' in asset)) return

      const ref = String((asset as JsonObject)._ref)
      if (!ref.startsWith('image-')) return

      const existing = entries.get(ref)
      if (existing) {
        if (!existing.sourceDocuments.includes(sourceId)) existing.sourceDocuments.push(sourceId)
        return
      }

      entries.set(ref, {
        sanityAssetRef: ref,
        sanityCdnUrl: sanityImageUrlFromRef(ref),
        sourceDocuments: [sourceId],
        targetPayloadMediaId: null,
      })
    })
  }

  return Array.from(entries.values()).sort((a, b) => a.sanityAssetRef.localeCompare(b.sanityAssetRef))
}
