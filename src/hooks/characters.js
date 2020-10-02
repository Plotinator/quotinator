import { useCollection } from '@nandorojo/swr-firestore'
import { charactersByIdSelector, charactersByNameSelector } from '../selectors/characters'
import { useUser } from './user'

export function useCharacters () {
  const { user } = useUser()
  return useCollection('characters', {where: ['userId', '==', user?.uid]})
}

export function useCharactersById () {
  const { data: characters } = useCharacters()
  return characters ? charactersByIdSelector(characters) : null
}

export function useCharacter (characterId) {
  const { data: characters } = useCharacters()
  if (!characterId) return null
  if (!characters) return null

  return charactersByIdSelector(characters)[characterId]
}

export function useCharacterNamesMap () {
  const { data: characters } = useCharacters()
  if (!characters) return []

  return charactersByNameSelector(characters)
}