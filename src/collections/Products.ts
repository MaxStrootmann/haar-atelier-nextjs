import type { CollectionConfig } from 'payload'

import { sourceField } from './fields/source'

const productCategoryOptions = [
  { label: 'Accessoires', value: 'Accessoires' },
  { label: 'Lichaamsverzorging', value: 'Lichaamsverzorging' },
  { label: 'Maskers & Colour Treatments', value: 'Maskers & Colour Treatments' },
  { label: 'Shampoo & Conditioners', value: 'Shampoo & Conditioners' },
  { label: 'Versteviging & Styling', value: 'Versteviging & Styling' },
  { label: 'Verzorging & Bescherming', value: 'Verzorging & Bescherming' },
]

export const Products: CollectionConfig = {
  slug: 'products',
  versions: { drafts: true },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'inStock', 'category', 'brand', 'updatedAt'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'description', type: 'richText' },
    {
      name: 'rawPortableTextDescription',
      type: 'json',
      admin: {
        description: 'Original Sanity Portable Text preserved during migration.',
        position: 'sidebar',
      },
    },
    { name: 'featuredImage', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'secondaryImages',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    { name: 'price', type: 'number', required: true, min: 0 },
    {
      name: 'currency',
      type: 'select',
      defaultValue: 'EUR',
      required: true,
      options: [{ label: 'EUR', value: 'EUR' }],
    },
    { name: 'inStock', type: 'checkbox', defaultValue: true },
    { name: 'popularity', type: 'number', defaultValue: 0 },
    { name: 'sku', type: 'text', admin: { position: 'sidebar' } },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: productCategoryOptions,
    },
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
      required: false,
    },
    {
      name: 'legacyBrandLabel',
      type: 'text',
      admin: { position: 'sidebar' },
    },
    sourceField,
  ],
}
