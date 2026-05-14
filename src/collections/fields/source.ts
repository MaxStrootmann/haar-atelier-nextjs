import type { Field } from 'payload'

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
