import { Grid, Column, Row } from './grid/SpectreGrid'
import Table from './grid/Table'

export default function App (props) {

  return <div className='main'>
    <nav>
      <Grid>
        <Row>
          <Column size={2}>Quotr</Column>
          <Column size={10}>
            <div className='categoriesWrapper'>
              <div className='category'>Favorites</div>
              <div className='category'>Authors</div>
              <div className='category selected'>Works</div>
              <div className='category'>Characters</div>
              <div className='category'>Uncategorized</div>
              <div className='searchInput'><input placeholder='Search'/></div>
            </div>
            <div className='categoriesWrapper secondRow'>
              <div className='category'>Book</div>
              <div className='category'>Speech</div>
              <div className='category'>Poem</div>
              <div className='category'>Event</div>
            </div>
          </Column>
        </Row>
      </Grid>
    </nav>
    <main>
      <Table/>
    </main>
    <footer></footer>
  </div>



  return <Grid>
    <Row>
      <Column size={2}>Quotr</Column>
      <Column size={10}>
        <div className='categoriesWrapper'>
          <div className='category'>Favorites</div>
          <div className='category'>Authors</div>
          <div className='category selected'>Works</div>
          <div className='category'>Characters</div>
          <div className='category'>Uncategorized</div>
          <div className='searchInput'><input placeholder='Search'/></div>
        </div>
        <div className='categoriesWrapper secondRow'>
          <div className='category'>Book</div>
          <div className='category'>Speech</div>
          <div className='category'>Poem</div>
          <div className='category'>Event</div>
        </div>
      </Column>
    </Row>
    <Table/>
  </Grid>
}