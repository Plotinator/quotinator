import { useCollection } from '@nandorojo/swr-firestore'
import { authorsByIdSelector, authorsByNameSelector } from '../selectors/authors'
import { useUser } from './user'


export function useAuthors () {
  const { user } = useUser()
  return useCollection('authors', {where: ['userId', '==', user?.uid]})
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