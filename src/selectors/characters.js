import { createSelector } from 'reselect'
import { keyBy } from 'lodash'

const selectAllCharacters = data => data

export const charactersByIdSelector = createSelector(
  selectAllCharacters,
  (characters) => keyBy(characters, 'id')
)

export const charactersByNameSelector = createSelector(
  selectAllCharacters,
  (characters) => keyBy(characters, 'name')
)