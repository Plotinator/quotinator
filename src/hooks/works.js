import { useCollection } from '@nandorojo/swr-firestore'
import { worksByIdSelector, worksByNameSelector } from '../selectors/works'
import hardCodedUserId from '../store/hardCodedUserId'

export function useWorksById () {
  const { data: works } = useCollection('works', {where: ['userId', '==', hardCodedUserId]})
  return works ? worksByIdSelector(works) : null
}

export function useWork (workId) {
  const { data: works } = useCollection('works', {where: ['userId', '==', hardCodedUserId]})
  if (!works) return null

  const worksById = worksByIdSelector(works)
  return worksById[workId]
}

export function useWorkNamesMap () {
  const { data: works } = useCollection('works', {where: ['userId', '==', hardCodedUserId]})
  if (!works) return []

  return worksByNameSelector(works)
}
