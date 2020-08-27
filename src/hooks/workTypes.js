import { useCollection } from '@nandorojo/swr-firestore'
import hardCodedUserId from '../store/hardCodedUserId'
import { sortedWorkTypesSelector } from '../selectors/workTypes'

export function useWorkTypes () {
  const { data } = useCollection('workTypes', {where: ['userId', '==', hardCodedUserId]})
  return data
}

export function useSortedWorkTypes () {
  const data = useCollection('workTypes', {where: ['userId', '==', hardCodedUserId]})
  if (!data.data) return data

  return { ...data, sortedWorkTypes: sortedWorkTypesSelector(data.data)}
}