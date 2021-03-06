import { useCollection } from '@nandorojo/swr-firestore'
import { sortedWorkTypesSelector, workTypesByIdSelector, workTypesByNameSelector } from '../selectors/workTypes'
import { useUser } from './user'

export function useWorkTypes () {
  const { user } = useUser()
  return useCollection('workTypes', {where: ['userId', '==', user?.uid]})
}

export function useSortedWorkTypes () {
  const data = useWorkTypes()
  if (!data.data) return data

  return { ...data, sortedWorkTypes: sortedWorkTypesSelector(data.data)}
}

export function useWorkTypesById () {
  const { data } = useWorkTypes()
  return data ? workTypesByIdSelector(data) : null
}

export function useWorkTypeNamesMap () {
  const { data } = useWorkTypes()
  if (!data) return []

  return workTypesByNameSelector(data)
}