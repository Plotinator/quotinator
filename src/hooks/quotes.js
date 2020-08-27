import { useRecoilValue } from 'recoil'
import { useCollection } from '@nandorojo/swr-firestore'
import { selectedTopicIds } from '../recoil/atoms'
import hardCodedUserId from '../store/hardCodedUserId'
import { quotesFilteredByTopicSelector } from '../selectors/quotes'

export function useQuotes () {
  return useCollection('quotes', {where: ['userId', '==', hardCodedUserId]})
}

export function useQuotesFilteredByTopic () {
  const selectedIds = useRecoilValue(selectedTopicIds)
  const data = useQuotes()
  if (!data.data) return data

  return { ...data, selectedQuotes: quotesFilteredByTopicSelector(data.data, selectedIds)}

}