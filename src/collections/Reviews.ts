import type { CollectionConfig } from 'payload'

import { sourceField } from './fields/source'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  versions: { drafts: true },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'published', 'sortOrder', 'updatedAt'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'body', type: 'richText', required: true },
    {
      name: 'rawPortableTextBody',
      type: 'json',
      admin: {
        description: 'Original Sanity Portable Text preserved during migration.',
        position: 'sidebar',
      },
    },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
    { name: 'published', type: 'checkbox', defaultValue: true },
    sourceField,
  ],
}
