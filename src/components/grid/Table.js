import { Grid, Row, Column } from './SpectreGrid'

export default function Table (props) {
  return <Grid>
    <Row className='mainWrapper'>
      <Column size={2} className='topicsSidebar'>
        <div className='topicsText'>Topics</div>
        <div className='topicsList'>
          <div className='topic'>Parenthood</div>
          <div className='topic'>Parenthood</div>
          <div className='topic selected'>Parenthood</div>
          <div className='topic'>Parenthood</div>
        </div>
      </Column>
      <Column size={10} className='cardGridWrapper'>
        <div className='cardGrid'></div>
      </Column>
    </Row>
  </Grid>
}