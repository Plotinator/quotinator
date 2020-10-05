import { createSelector } from 'reselect'
import { sortBy, keyBy } from 'lodash'

const selectAllWorkTypes = data => data

export const sortedWorkTypesSelector = createSelector(
  selectAllWorkTypes,
  (types) => sortBy(types, 'position')
)

export const workTypesByIdSelector = createSelector(
  selectAllWorkTypes,
  (types) => keyBy(types, 'id')
)

export const workTypesByNameSelector = createSelector(
  selectAllWorkTypes,
  (types) => keyBy(types, 'name')
)
