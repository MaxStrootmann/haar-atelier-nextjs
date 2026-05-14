import { getPayloadClient } from '../client'

export const getPayloadPriceGroups = async () => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'price-groups',
    depth: 0,
    limit: 100,
    sort: 'sortOrder',
  })

  return result.docs.map((group) => ({
    _id: String(group.sourceId || group.id),
    category: group.category,
    conditions: group.conditions,
    treatment: (group.treatments || []).map((row) => ({
      _id: row.id || row.sourceKey || row.name,
      treatment: row.name,
      conditions: row.conditions,
      price: row.price,
    })),
  }))
}
