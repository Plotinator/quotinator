import { useState, useEffect } from 'react'
import { groupBy } from 'lodash'

export function useFilterAndGroupQuotes (quotes, attr) {
  const filterAndGroup = () => groupBy(quotes.filter(q => q[attr]), attr)

  const [groupedQuotes, setQuotes] = useState(filterAndGroup())

  useEffect(() => {
    setQuotes(filterAndGroup())
  }, [quotes])

  return groupedQuotes
}