import { useCollection } from '@nandorojo/swr-firestore'
import { charactersByIdSelector, charactersByNameSelector } from '../selectors/characters'
import hardCodedUserId from '../store/hardCodedUserId'

export function useCharactersById () {
  const { data: characters } = useCollection('characters', {where: ['userId', '==', hardCodedUserId]})
  return characters ? charactersByIdSelector(characters) : null
}

export function useCharacter (characterId) {
  const { data: characters } = useCollection('characters', {where: ['userId', '==', hardCodedUserId]})
  if (!characters) return null

  const charactersById = charactersByIdSelector(characters)
  return charactersById[characterId]
}

export function useCharacterNamesMap () {
  const { data: characters } = useCollection('characters', {where: ['userId', '==', hardCodedUserId]})
  if (!characters) return []

  return charactersByNameSelector(characters)
}