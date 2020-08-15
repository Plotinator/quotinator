import { Grid, Row } from './spectre/Grid'
import TopicsSidebar from './topics/TopicsSidebar'
import CardGridWrapper from './cards/CardGridWrapper'
import { IoIosAdd } from 'react-icons/io'

export default function Main (props) {
  return <main>
    <Grid>
      <Row className='mainWrapper'>
        <TopicsSidebar />
        <CardGridWrapper />
      </Row>
    </Grid>
    <div className='circle-add-button'><IoIosAdd /></div>
  </main>
}