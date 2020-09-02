import { Column } from '../spectre/Grid'
import Spinner from '../spectre/Spinner'
import CardGrid from './CardGrid'
import { useFilteredQuotes } from '../../hooks/quotes'

export default function CardGridWrapper (props) {
  const { data, visibleQuotes, error, isValidating, loading } = useFilteredQuotes()

  const renderData = () => {
    if (data && visibleQuotes) {
      return <CardGrid quotes={visibleQuotes} />
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