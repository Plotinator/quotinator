import { createSelector } from 'reselect'
import { keyBy, groupBy } from 'lodash'

const selectAllWorks = data => data
const workType = (data, workType) => workType

export const worksByIdSelector = createSelector(
  selectAllWorks,
  (works) => keyBy(works, 'id')
)

export const worksByNameSelector = createSelector(
  selectAllWorks,
  (works) => keyBy(works, 'name')
)

export const worksGroupedByWorkTypeSelector = createSelector(
  selectAllWorks,
  (works) => groupBy(works, 'workType')
)

export const workIdsOfWorkTypeSelector = createSelector(
  worksGroupedByWorkTypeSelector,
  workType,
  (worksByType, workType) => worksByType[workType]
)