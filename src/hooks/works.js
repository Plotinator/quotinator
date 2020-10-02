import { useCollection } from '@nandorojo/swr-firestore'
import { groupBy } from 'lodash'
import { worksByIdSelector, worksByNameSelector, workIdsOfWorkTypeSelector } from '../selectors/works'
import { useUser } from './user'

export function useWorks () {
  const { user } = useUser()
  return useCollection('works', {where: ['userId', '==', user?.uid]})
}

export function useWorksById () {
  const { data } = useWorks()
  return data ? worksByIdSelector(data) : null
}

export function useWork (workId) {
  const { data } = useWorks()
  if (!workId) return null
  if (!data) return null

  return worksByIdSelector(data)[workId]
}

export function useWorkNamesMap () {
  const { data } = useWorks()
  if (!data) return []

  return worksByNameSelector(data)
}

export function useWorkIdsOfWorkType (workTypeId) {
  const { data } = useWorks()
  if (!data) return []

  return workIdsOfWorkTypeSelector(data, workTypeId)
}
