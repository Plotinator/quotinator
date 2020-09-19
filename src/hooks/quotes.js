import { useRecoilValue } from 'recoil'
import { useCollection } from '@nandorojo/swr-firestore'
import { selectedTopicIds, selectedCategory } from '../recoil/atoms'
import hardCodedUserId from '../store/hardCodedUserId'
import { filteredQuotesSelector, quotesByIdSelector } from '../selectors/quotes'

export function useQuotes () {
  return useCollection('quotes', {where: ['userId', '==', hardCodedUserId]})
}

export function useQuote (quoteId) {
  const { data } = useQuotes()
  if (!quoteId) return null
  if (!data) return null

  return quotesByIdSelector(data)[quoteId]
}

export function useFilteredQuotes () {
  const selectedIds = useRecoilValue(selectedTopicIds)
  const category = useRecoilValue(selectedCategory)
  const data = useQuotes()
  if (!data.data) return data

  return { ...data, visibleQuotes: filteredQuotesSelector(data.data, selectedIds, category)}
}
