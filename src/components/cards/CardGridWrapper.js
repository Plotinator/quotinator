import { Column } from '../spectre/Grid'
import { useCollection } from '@nandorojo/swr-firestore'
import hardCodedUserId from '../../store/hardCodedUserId'
import Spinner from '../spectre/Spinner'
import CardGrid from './CardGrid'

export default function CardGridWrapper (props) {
  const { data, error, isValidating, loading } = useCollection('quotes', {where: ['userId', '==', hardCodedUserId]})

  const renderData = () => {
    if (data) {
      return <CardGrid data={data} />
    } else if (isValidating || loading) {
      return <Spinner large/>
    } else if (error) {
      return <div>Error! {error}</div>
    }
  }

  return <Column size={10} className='cardGridWrapper'>
    { renderData() }
  </Column>
}