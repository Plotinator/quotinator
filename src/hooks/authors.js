import { useCollection } from '@nandorojo/swr-firestore'
import { authorsByIdSelector } from '../selectors/authors'
import hardCodedUserId from '../store/hardCodedUserId'

export function useAuthor (authorId) {
  const { data: authors } = useCollection('authors', {where: ['userId', '==', hardCodedUserId]})
  if (authors) {
    const authorsById = authorsByIdSelector(authors)
    return authorsById[authorId]
  } else {
    return null
  }
}