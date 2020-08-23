import { createSelector } from 'reselect'
import { keyBy } from 'lodash'

const selectAllWorks = data => data

export const worksByIdSelector = createSelector(
  selectAllWorks,
  (works) => keyBy(works, 'id')
)

export const worksByNameSelector = createSelector(
  selectAllWorks,
  (works) => keyBy(works, 'name')
)