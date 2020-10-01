import { useCollection } from '@nandorojo/swr-firestore'
import { topicsByIdSelector, topicsByNameSelector, nextTopicPositionSelector, sortedTopicsSelector } from '../selectors/topics'
import hardCodedUserId from '../store/hardCodedUserId'

export function useTopics () {
  return useCollection('topics', {where: ['userId', '==', hardCodedUserId]})
}

export function useTopicsById () {
  const { data: topics } = useTopics()
  return topics ? topicsByIdSelector(topics) : null
}

export function useTopicNamesMap () {
  const { data: topics } = useTopics()
  if (!topics) return null

  return topicsByNameSelector(topics)
}

export function useNextTopicPosition () {
  const { data: topics } = useTopics()
  if (!topics) return null

  return nextTopicPositionSelector(topics)
}

export function useSortedTopics () {
  const data = useTopics()
  if (!data.data) return data

  return { ...data, sortedTopics: sortedTopicsSelector(data.data)}
}
