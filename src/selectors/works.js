import { createSelector } from 'reselect'
import { keyBy, groupBy } from 'lodash'

const selectAllWorks = data => data
const workTypeId = (data, workTypeId) => workTypeId

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
  (works) => groupBy(works, 'workTypeId')
)

export const workIdsOfWorkTypeSelector = createSelector(
  worksGroupedByWorkTypeSelector,
  workTypeId,
  (worksByType, workTypeId) => worksByType[workTypeId]
)