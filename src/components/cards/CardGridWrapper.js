import { useRecoilValue } from 'recoil'
import { selectedSecondaryTab } from '../../recoil/atoms'
import { Column } from '../spectre/Grid'
import Spinner from '../spectre/Spinner'
import CardGrid from './CardGrid'
import Quote from '../quotes/Quote'
import { useFilteredQuotes } from '../../hooks/quotes'
import WorksGrid from '../works/WorksGrid'
import AuthorsGrid from '../authors/AuthorsGrid'

export default function CardGridWrapper (props) {
  const secondaryTab = useRecoilValue(selectedSecondaryTab)
  const { data, visibleQuotes, error, isValidating, loading } = useFilteredQuotes()

  const renderData = () => {
    if (data && visibleQuotes) {
      switch (secondaryTab) {
        case 'authors':
          return <AuthorsGrid quotes={visibleQuotes} />
        case 'characters':
        case 'all':
          return <CardGrid items={visibleQuotes} renderItem={q => <Quote key={q.id} quote={q} />} />
        default:
          return <WorksGrid quotes={visibleQuotes} />
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