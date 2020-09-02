import { useRecoilValue } from 'recoil'
import { useCollection } from '@nandorojo/swr-firestore'
import { selectedTopicIds, selectedCategory } from '../recoil/atoms'
import hardCodedUserId from '../store/hardCodedUserId'
import { filteredQuotesSelector } from '../selectors/quotes'

export function useQuotes () {
  return useCollection('quotes', {where: ['userId', '==', hardCodedUserId]})
}

export function useFilteredQuotes () {
  const selectedIds = useRecoilValue(selectedTopicIds)
  const category = useRecoilValue(selectedCategory)
  const data = useQuotes()
  if (!data.data) return data

  return { ...data, visibleQuotes: filteredQuotesSelector(data.data, selectedIds, category)}
}
