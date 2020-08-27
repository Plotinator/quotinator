import { createSelector } from 'reselect'
import { keyBy, sortBy } from 'lodash'

const selectAllTopics = data => data

export const topicsByIdSelector = createSelector(
  selectAllTopics,
  (topics) => keyBy(topics, 'id')
)

export const topicsByNameSelector = createSelector(
  selectAllTopics,
  (topics) => keyBy(topics, 'name')
)

export const nextTopicPositionSelector = createSelector(
  selectAllTopics,
  (topics) => Math.max(topics.map(t => t.position)) + 1
)

export const sortedTopicsSelector = createSelector(
  selectAllTopics,
  (topics) => sortBy(topics, 'name')
)