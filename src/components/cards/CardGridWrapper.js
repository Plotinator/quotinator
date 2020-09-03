import { useRecoilValue } from 'recoil'
import { selectedSecondaryTab } from '../../recoil/atoms'
import { Column } from '../spectre/Grid'
import Spinner from '../spectre/Spinner'
import CardGrid from './CardGrid'
import { useFilteredQuotes } from '../../hooks/quotes'

export default function CardGridWrapper (props) {
  const secondaryTab = useRecoilValue(selectedSecondaryTab)
  const { data, visibleQuotes, error, isValidating, loading } = useFilteredQuotes()

  const renderData = () => {
    if (data && visibleQuotes) {
      switch (secondaryTab) {
        case 'authors':
        case 'characters':
        case 'all':
        default:
          return <CardGrid quotes={visibleQuotes} />
      }
    } else if (isValidating || loading) {
      return <Spinner large/>
    } else if (error) {
      return <div>Error! {error}</div>
    }
  }

  return <Column size={10} className='card-grid__wrapper'>
    { renderData() }
  </Column>
}