import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Brands } from './collections/Brands'
import { Media } from './collections/Media'
import { PriceGroups } from './collections/PriceGroups'
import { Products } from './collections/Products'
import { Reviews } from './collections/Reviews'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Brands, Products, PriceGroups, Reviews],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'payload-dev-secret-change-me',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.PAYLOAD_DATABASE_URL || process.env.DATABASE_URL,
    },
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
