import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'nc8y31kd',
  dataset: 'production',
  apiVersion: '2023-08-23',
  token: process.env.SANITY_PROJECT_TOKEN,
  useCdn: false,
})

export const sourceTypes = ['product', 'review', 'prices', 'category', 'hoofdcategorie', 'subcategorie'] as const

export type SourceType = (typeof sourceTypes)[number]

export type SanitySnapshot = Record<SourceType, unknown[]>

export const fetchSanitySnapshot = async (): Promise<SanitySnapshot> => {
  const entries = await Promise.all(
    sourceTypes.map(async (type) => {
      const docs = await sanityClient.fetch<unknown[]>(`*[_type == $type] | order(_createdAt asc)`, { type })
      return [type, docs] as const
    }),
  )

  return Object.fromEntries(entries) as SanitySnapshot
}

export const snapshotCounts = (snapshot: SanitySnapshot) =>
  Object.fromEntries(sourceTypes.map((type) => [type, snapshot[type].length])) as Record<SourceType, number>
