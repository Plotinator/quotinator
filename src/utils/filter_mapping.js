
export function filterMap (tabIdx) {
  switch (tabIdx) {
    case 0:
      return 'all'
    case 1:
      return 'favorites'
    case 2:
      return 'authors'
    case 3:
      return 'works'
    case 4:
      return 'characters'
    case 5:
      return 'uncategorized'
    default:
      return 'favorites'
  }
}