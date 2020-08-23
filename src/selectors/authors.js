import { createSelector } from 'reselect'
import { keyBy } from 'lodash'

const selectAllAuthors = data => data

export const authorsByIdSelector = createSelector(
  selectAllAuthors,
  (authors) => keyBy(authors, 'id')
)

export const authorsByNameSelector = createSelector(
  selectAllAuthors,
  (authors) => keyBy(authors, 'name')
)
