import type { Field } from 'payload'

export const sourceIdField: Field = {
  name: 'sourceId',
  type: 'text',
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: 'Original source document ID for idempotent imports.',
  },
}

export const sourceField: Field = {
  name: 'source',
  type: 'group',
  admin: {
    position: 'sidebar',
  },
  fields: [
    { name: 'system', type: 'text', defaultValue: 'sanity' },
    { name: 'id', type: 'text', index: true },
    { name: 'type', type: 'text' },
    { name: 'createdAt', type: 'date' },
    { name: 'updatedAt', type: 'date' },
    { name: 'raw', type: 'json' },
  ],
}
