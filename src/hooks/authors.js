import { useCollection } from '@nandorojo/swr-firestore'
import { authorsByIdSelector, authorsByNameSelector } from '../selectors/authors'
import hardCodedUserId from '../store/hardCodedUserId'


export function useAuthors () {
  return useCollection('authors', {where: ['userId', '==', hardCodedUserId]})
}

export function useAuthorsById () {
  const { data: authors } = useAuthors()
  return authors ? authorsByIdSelector(authors) : null
}

export function useAuthor (authorId) {
  const { data: authors } = useAuthors()
  if (!authorId) return null
  if (!authors) return null

  return authorsByIdSelector(authors)[authorId]
}

export function useAddAuthor () {
  const { add } = useAuthors()
  return add
}

export function useAuthorNamesMap () {
  const { data: authors } = useAuthors()
  if (!authors) return []

  return authorsByNameSelector(authors)
}