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
    _id: String(group.source?.id || group.id),
    category: group.category,
    conditions: group.conditions,
    treatment: group.treatments || [],
  }))
}
