import { Grid, Row } from '../spectre/Grid'

export default function CardGrid (props) {
  const renderItems = () => {
    if (!props.items) return null
    if (!props.items.length) return null
    return props.items.map(props.renderItem)
  }

  return <Grid>
    <Row className='card-grid'>
      { renderItems() }
    </Row>
  </Grid>
}