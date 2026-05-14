import { createHash } from 'crypto'
import { mkdir, writeFile } from 'fs/promises'
import path from 'path'

import { buildMediaManifest } from '../../src/lib/migration/mediaManifest'
import { fetchSanitySnapshot, snapshotCounts } from '../../src/lib/migration/sanitySnapshot'

const main = async () => {
  const snapshot = await fetchSanitySnapshot()
  const counts = snapshotCounts(snapshot)
  const allDocuments = Object.values(snapshot).flat()
  const mediaManifest = buildMediaManifest(allDocuments)

  const payload = {
    generatedAt: new Date().toISOString(),
    source: {
      system: 'sanity',
      projectId: 'nc8y31kd',
      dataset: 'production',
    },
    counts,
    media: {
      uniqueImageRefs: mediaManifest.length,
    },
    snapshot,
    mediaManifest,
  }

  const serialized = JSON.stringify(payload, null, 2)
  const hash = createHash('sha256').update(serialized).digest('hex')
  const outputDir = path.resolve(process.cwd(), 'migration-output', new Date().toISOString().replace(/[:.]/g, '-'))

  await mkdir(outputDir, { recursive: true })
  await writeFile(path.join(outputDir, 'sanity-snapshot.json'), serialized)
  await writeFile(path.join(outputDir, 'media-manifest.json'), JSON.stringify(mediaManifest, null, 2))
  await writeFile(
    path.join(outputDir, 'summary.json'),
    JSON.stringify({ generatedAt: payload.generatedAt, counts, media: payload.media, sha256: hash }, null, 2),
  )

  console.log(JSON.stringify({ outputDir, counts, media: payload.media, sha256: hash }, null, 2))
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
