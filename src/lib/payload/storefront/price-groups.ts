import type { PriceGroup } from '../../../payload-types'

import { getPayloadClient } from '../client'
import type { StorefrontPriceGroup } from './types'

export const payloadPriceGroupToStorefrontPriceGroup = (group: PriceGroup): StorefrontPriceGroup => ({
  id: String(group.id),
  category: group.category,
  slug: group.slug,
  conditions: group.conditions,
  sortOrder: group.sortOrder ?? 0,
  treatments: (group.treatments || []).map((row) => ({
    id: row.id || row.sourceKey || row.name,
    name: row.name,
    conditions: row.conditions,
    price: row.price,
  })),
})

export const getStorefrontPriceGroups = async (): Promise<StorefrontPriceGroup[]> => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'price-groups',
    depth: 0,
    limit: 100,
    sort: 'sortOrder',
  })

  return result.docs.map(payloadPriceGroupToStorefrontPriceGroup)
}
