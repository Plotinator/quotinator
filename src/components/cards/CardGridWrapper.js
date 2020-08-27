import { Column } from '../spectre/Grid'
import Spinner from '../spectre/Spinner'
import CardGrid from './CardGrid'
import { useQuotesFilteredByTopic } from '../../hooks/quotes'

export default function CardGridWrapper (props) {
  const { data, selectedQuotes, error, isValidating, loading } = useQuotesFilteredByTopic()

  const renderData = () => {
    if (data && selectedQuotes) {
      return <CardGrid quotes={selectedQuotes} />
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