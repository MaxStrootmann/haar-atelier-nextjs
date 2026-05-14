import { mkdir, rm, writeFile } from 'fs/promises'
import os from 'os'
import path from 'path'

import { buildMediaManifest, type MediaManifestEntry } from '../../src/lib/migration/mediaManifest'
import { fetchSanitySnapshot, snapshotCounts } from '../../src/lib/migration/sanitySnapshot'
import { portableTextToLexical } from '../../src/lib/migration/portableTextToLexical'

type JsonObject = Record<string, any>

type ImportSummary = {
  mode: 'dry-run' | 'write'
  counts: ReturnType<typeof snapshotCounts>
  media: { source: number; created: number; updated: number; skipped: number; failed: number }
  brands: { source: number; created: number; updated: number; skipped: number }
  products: { source: number; created: number; updated: number; skipped: number; failed: number }
  priceGroups: { source: number; created: number; updated: number; skipped: number }
  reviews: { source: number; created: number; updated: number; skipped: number }
  failures: Array<{ type: string; id: string; error: string }>
}

const writeMode = process.argv.includes('--write')
const limitArg = process.argv.find((arg) => arg.startsWith('--limit='))
const limit = limitArg ? Number(limitArg.split('=')[1]) : undefined

const slugValue = (slug: unknown) => {
  if (typeof slug === 'string') return slug
  if (slug && typeof slug === 'object' && 'current' in slug) return String((slug as JsonObject).current)
  return ''
}

const sourceData = (doc: JsonObject) => ({
  system: 'sanity',
  id: doc._id,
  type: doc._type,
  createdAt: doc._createdAt,
  updatedAt: doc._updatedAt,
  raw: doc,
})

const findBySourceId = async (payload: any, collection: string, sourceId: string) => {
  const result = await payload.find({
    collection,
    limit: 1,
    depth: 0,
    where: { sourceId: { equals: sourceId } },
  })
  return result.docs[0]
}

const findMediaByRef = async (payload: any, sanityAssetRef: string) => {
  const result = await payload.find({
    collection: 'media',
    limit: 1,
    depth: 0,
    where: { sanityAssetRef: { equals: sanityAssetRef } },
  })
  return result.docs[0]
}

const extensionFromRef = (ref: string) => ref.split('-').pop() || 'jpg'

const downloadMedia = async (entry: MediaManifestEntry, dir: string) => {
  if (!entry.sanityCdnUrl) throw new Error('Missing Sanity CDN URL')
  const response = await fetch(entry.sanityCdnUrl)
  if (!response.ok) throw new Error(`Download failed with HTTP ${response.status}`)
  const buffer = Buffer.from(await response.arrayBuffer())
  const filePath = path.join(dir, `${entry.sanityAssetRef}.${extensionFromRef(entry.sanityAssetRef)}`)
  await writeFile(filePath, buffer)
  return { filePath, buffer }
}

const createOrUpdateMedia = async (payload: any, entry: MediaManifestEntry, tmpDir: string, summary: ImportSummary) => {
  const existing = await findMediaByRef(payload, entry.sanityAssetRef)
  if (existing) {
    summary.media.skipped += 1
    return existing.id
  }

  const { filePath, buffer } = await downloadMedia(entry, tmpDir)
  const filename = path.basename(filePath)
  const mimetype = `image/${extensionFromRef(entry.sanityAssetRef).replace('jpg', 'jpeg')}`

  const created = await payload.create({
    collection: 'media',
    data: {
      alt: filename,
      sanityAssetRef: entry.sanityAssetRef,
      source: {
        sanityAssetRef: entry.sanityAssetRef,
        sanityCdnUrl: entry.sanityCdnUrl,
        originalFilename: filename,
      },
    },
    file: {
      name: filename,
      data: buffer,
      mimetype,
      size: buffer.length,
    },
  })

  summary.media.created += 1
  return created.id
}

const upsertBySourceId = async (payload: any, collection: string, sourceDoc: JsonObject, data: JsonObject) => {
  const existing = await findBySourceId(payload, collection, sourceDoc._id)
  if (existing) {
    return {
      operation: 'updated' as const,
      doc: await payload.update({ collection, id: existing.id, data }),
    }
  }

  return {
    operation: 'created' as const,
    doc: await payload.create({ collection, data }),
  }
}

const main = async () => {
  const snapshot = await fetchSanitySnapshot()
  const counts = snapshotCounts(snapshot)
  const allDocs = Object.values(snapshot).flat()
  const mediaManifest = buildMediaManifest(allDocs)
  const products = (snapshot.product as JsonObject[]).slice(0, limit)
  const reviews = (snapshot.review as JsonObject[]).slice(0, limit)
  const priceGroups = (snapshot.prices as JsonObject[]).slice(0, limit)
  const brandLabels = Array.from(new Set((snapshot.product as JsonObject[]).map((doc) => doc.brand).filter(Boolean).map(String))).sort()

  const summary: ImportSummary = {
    mode: writeMode ? 'write' : 'dry-run',
    counts,
    media: { source: mediaManifest.length, created: 0, updated: 0, skipped: 0, failed: 0 },
    brands: { source: brandLabels.length, created: 0, updated: 0, skipped: 0 },
    products: { source: products.length, created: 0, updated: 0, skipped: 0, failed: 0 },
    priceGroups: { source: priceGroups.length, created: 0, updated: 0, skipped: 0 },
    reviews: { source: reviews.length, created: 0, updated: 0, skipped: 0 },
    failures: [],
  }

  if (!writeMode) {
    console.log(JSON.stringify(summary, null, 2))
    return
  }

  const nativeImport = new Function('specifier', 'return import(specifier)') as <T>(specifier: string) => Promise<T>
  const [{ getPayload }, { default: config }] = await Promise.all([
    nativeImport<typeof import('payload')>('payload'),
    nativeImport<typeof import('../../src/payload.config')>('../../src/payload.config.ts'),
  ])
  const payload = await getPayload({ config })
  const tmpDir = path.join(os.tmpdir(), `haar-payload-import-${Date.now()}`)
  await mkdir(tmpDir, { recursive: true })

  try {
    const mediaByRef = new Map<string, string>()

    for (const entry of mediaManifest) {
      try {
        const id = await createOrUpdateMedia(payload, entry, tmpDir, summary)
        mediaByRef.set(entry.sanityAssetRef, id)
      } catch (error) {
        summary.media.failed += 1
        summary.failures.push({ type: 'media', id: entry.sanityAssetRef, error: error instanceof Error ? error.message : String(error) })
      }
    }

    const brandByLabel = new Map<string, string>()
    for (const label of brandLabels) {
          const sourceDoc = { _id: `brand-${label.toLowerCase()}`, _type: 'derived-brand', _createdAt: undefined, _updatedAt: undefined, label }
      const result = await upsertBySourceId(payload, 'brands', sourceDoc, {
        sourceId: sourceDoc._id,
        title: label,
        slug: label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        source: sourceData(sourceDoc),
      })
      summary.brands[result.operation] += 1
      brandByLabel.set(label, result.doc.id)
    }

    const imageId = (image: JsonObject | undefined) => {
      const ref = image?.asset?._ref
      return ref ? mediaByRef.get(ref) : undefined
    }

    for (const product of products) {
      try {
        const featuredImage = imageId(product.featured_image)

        const result = await upsertBySourceId(payload, 'products', product, {
          sourceId: product._id,
          name: product.name,
          slug: slugValue(product.slug),
          description: portableTextToLexical(product.description),
          rawPortableTextDescription: product.description || [],
          featuredImage,
          price: Number(product.price || 0),
          currency: product.currency || 'EUR',
          inStock: Boolean(product.in_stock),
          popularity: Number(product.popularity || 0),
          category: product.category,
          brand: product.brand ? brandByLabel.get(product.brand) : undefined,
          legacyBrandLabel: product.brand,
          source: sourceData(product),
        })
        summary.products[result.operation] += 1
      } catch (error) {
        summary.products.failed += 1
        summary.failures.push({ type: 'product', id: product._id, error: error instanceof Error ? error.message : String(error) })
      }
    }

    for (const group of priceGroups) {
      const result = await upsertBySourceId(payload, 'price-groups', group, {
        sourceId: group._id,
        category: group.category,
        slug: slugValue(group.slug) || String(group.category || group._id).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        treatments: (group.treatment || []).map((row: JsonObject) => ({
          sourceKey: row._key,
          name: row.treatment,
          conditions: row.conditions,
          price: String(row.price ?? ''),
        })),
        source: sourceData(group),
      })
      summary.priceGroups[result.operation] += 1
    }

    for (const review of reviews) {
      const result = await upsertBySourceId(payload, 'reviews', review, {
        sourceId: review._id,
        name: review.name,
        body: portableTextToLexical(review.inhoud),
        rawPortableTextBody: review.inhoud || [],
        photo: imageId(review.foto),
        published: true,
        source: sourceData(review),
      })
      summary.reviews[result.operation] += 1
    }
  } finally {
    await rm(tmpDir, { recursive: true, force: true })
  }

  console.log(JSON.stringify(summary, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error)
    process.exit(1)
  })
