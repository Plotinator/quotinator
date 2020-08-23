import { useCollection } from '@nandorojo/swr-firestore'
import hardCodedUserId from '../store/hardCodedUserId'

export function useWorkTypes () {
  const { data } = useCollection('workTypes', {where: ['userId', '==', hardCodedUserId]})
  return data
}