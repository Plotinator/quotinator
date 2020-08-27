import { createSelector } from 'reselect'
import { sortBy } from 'lodash'

const selectAllWorkTypes = data => data

export const sortedWorkTypesSelector = createSelector(
  selectAllWorkTypes,
  (types) => sortBy(types, 'position')
)
