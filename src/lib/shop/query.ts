export const categoryToQueryValue = (category: string) =>
  category.replace(/&/g, 'and').replace(/\s+/g, '-')

export const categoryFromQueryValue = (category: string) =>
  decodeURIComponent(category).replace(/-/g, ' ').replace(/\band\b/g, '&').trim()

export const sortToQueryValue = (sort: string) =>
  sort.replace(/\s+/g, '-')
