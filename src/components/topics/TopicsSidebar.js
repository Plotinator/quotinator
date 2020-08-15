import { Column } from '../spectre/Grid'
import { useCollection } from '@nandorojo/swr-firestore'
import hardCodedUserId from '../../store/hardCodedUserId'
import Spinner from '../spectre/Spinner'
import TopicsList from './TopicsList'

export default function TopicsSidebar (props) {
  const { data, error, isValidating, loading } = useCollection('topics', {where: ['userId', '==', hardCodedUserId]})

  const renderData = () => {
    if (data) {
      return <TopicsList data={data} />
    } else if (isValidating || loading) {
      return <Spinner large/>
    } else if (error) {
      return <div>Error! {error}</div>
    }
  }

  return <Column size={2} className='topicsSidebar'>
    <div className='topicsText'>Topics</div>
    { renderData() }
  </Column>
}