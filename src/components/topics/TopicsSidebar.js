import { Column } from '../spectre/Grid'
import { useCollection } from '@nandorojo/swr-firestore'
import hardCodedUserId from '../../store/hardCodedUserId'
import Spinner from '../spectre/Spinner'
import TopicsList from './TopicsList'
import { useSortedTopics } from '../../hooks/topics'

export default function TopicsSidebar (props) {
  const { data, sortedTopics, error, isValidating, loading } = useSortedTopics()

  const renderData = () => {
    if (data && sortedTopics) {
      return <TopicsList sortedTopics={sortedTopics} />
    } else if (isValidating || loading) {
      return <Spinner large/>
    } else if (error) {
      return <div>Error! {error}</div>
    }
  }

  return <Column size={2} className='topicsSidebar'>
    { renderData() }
  </Column>
}