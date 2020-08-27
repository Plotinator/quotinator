import Card from './Card'
import { Grid, Row } from '../spectre/Grid'

export default function CardGrid (props) {
  const { quotes } = props

  const renderCards = () => {
    return quotes.map(q => <Card key={q.id} quote={q} />)
  }

  return <Grid>
    <Row className='cardGrid'>
      { renderCards() }
    </Row>
  </Grid>
}