// TODO: the rest of these prefixes
const AUTHOR = 'a'
const TOPIC = 't'
const QUOTE = 'q'

export function newId (ids, prefix) {
  let searching = true
  let possibleId = ''
  while (searching) {
    possibleId = makeId(prefix)
    searching = ids.includes(possibleId)
  }
  return possibleId
}

function makeId (prefix) {
  return Math.random().toString(16).replace('0.', `${prefix}.`).substr(0, 8)
}

export function position (items) {
  return items.reduce((maxPosition, item) => Math.max(item.position, maxPosition), 0)
}

export function positionReset (items) {
  return items.map((item, index) => {
    item.position = index
    return item
  })
}
