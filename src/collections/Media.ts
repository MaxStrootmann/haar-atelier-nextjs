import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { adminsOrEditors } from '../access/roles'

export const Media: CollectionConfig = {
  access: {
    read: anyone,
    create: adminsOrEditors,
    update: adminsOrEditors,
    delete: adminsOrEditors,
  },
  slug: 'media',
  upload: {
    staticDir: 'media',
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 400, position: 'centre' },
      { name: 'card', width: 800, height: 800, position: 'centre' },
      { name: 'hero', width: 1600, position: 'centre' },
    ],
    mimeTypes: ['image/*'],
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'filename', 'updatedAt'],
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
    { name: 'caption', type: 'text' },
    {
      name: 'sanityAssetRef',
      type: 'text',
      unique: true,
      index: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'source',
      type: 'group',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'sanityAssetRef', type: 'text', unique: true, index: true },
        { name: 'sanityCdnUrl', type: 'text' },
        { name: 'originalFilename', type: 'text' },
      ],
    },
  ],
}
