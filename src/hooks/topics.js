import { useCollection } from '@nandorojo/swr-firestore'
import { topicsByIdSelector } from '../selectors/topics'
import hardCodedUserId from '../store/hardCodedUserId'

export function useTopicsById () {
  const { data: topics } = useCollection('topics', {where: ['userId', '==', hardCodedUserId]})
  return topics ? topicsByIdSelector(topics) : null
}