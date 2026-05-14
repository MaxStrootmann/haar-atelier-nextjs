import type { CollectionConfig } from 'payload'

import { sourceField } from './fields/source'

export const PriceGroups: CollectionConfig = {
  slug: 'price-groups',
  admin: {
    useAsTitle: 'category',
    defaultColumns: ['category', 'sortOrder', 'updatedAt'],
  },
  fields: [
    { name: 'category', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'conditions', type: 'textarea' },
    { name: 'sortOrder', type: 'number', defaultValue: 0 },
    {
      name: 'treatments',
      type: 'array',
      fields: [
        { name: 'sourceKey', type: 'text', admin: { position: 'sidebar' } },
        { name: 'name', type: 'text', required: true },
        { name: 'conditions', type: 'textarea' },
        { name: 'price', type: 'text', required: true },
      ],
    },
    sourceField,
  ],
}
