import { Grid, Column, Row } from './spectre/Grid'
import Main from './Main'
import Navigation from './Navigation'
import { RecoilRoot } from 'recoil'

export default function App (props) {

  return <RecoilRoot>
    <div className='main'>
      <nav>
        <Grid>
          <Row>
            <Column size={2}>
              <div className='brandBanner'>
                <h1>Quotr</h1>
              </div>
            </Column>
            <Navigation/>
          </Row>
        </Grid>
      </nav>
      <Main/>
      <footer></footer>
    </div>
  </RecoilRoot>
}