import { createSelector } from 'reselect'
import { keyBy } from 'lodash'

const selectAllTopics = data => data

export const topicsByIdSelector = createSelector(
  selectAllTopics,
  (topics) => keyBy(topics, 'id')
)