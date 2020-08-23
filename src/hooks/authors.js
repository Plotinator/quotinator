import { useCollection } from '@nandorojo/swr-firestore'
import { authorsByIdSelector, authorsByNameSelector } from '../selectors/authors'
import hardCodedUserId from '../store/hardCodedUserId'

export function useAuthorsById () {
  const { data: authors } = useCollection('authors', {where: ['userId', '==', hardCodedUserId]})
  return authors ? authorsByIdSelector(authors) : null
}

export function useAuthor (authorId) {
  const { data: authors } = useCollection('authors', {where: ['userId', '==', hardCodedUserId]})
  if (!authors) return null

  const authorsById = authorsByIdSelector(authors)
  return authorsById[authorId]
}

export function useAddAuthor () {
  const { add } = useCollection('authors', {where: ['userId', '==', hardCodedUserId]})
  return add
}

export function useAuthorNamesMap () {
  const { data: authors } = useCollection('authors', {where: ['userId', '==', hardCodedUserId]})
  if (!authors) return []

  return authorsByNameSelector(authors)
}