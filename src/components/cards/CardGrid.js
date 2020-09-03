import Quote from '../quotes/Quote'
import { Grid, Row } from '../spectre/Grid'

export default function CardGrid (props) {
  const { quotes } = props

  const renderQuotes = () => {
    if (!quotes.length) return null

    return quotes.map(q => <Quote key={q.id} quote={q} />)
  }

  return <Grid>
    <Row className='card-grid'>
      { renderQuotes() }
    </Row>
  </Grid>
}