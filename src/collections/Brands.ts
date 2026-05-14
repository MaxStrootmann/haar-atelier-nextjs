import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'

import { sourceField, sourceIdField } from './fields/source'

export const Brands: CollectionConfig = {
  access: { read: anyone },
  slug: 'brands',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'description', type: 'richText' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
    sourceIdField,
    sourceField,
  ],
}
