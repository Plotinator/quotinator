import { Grid, Column, Row } from './spectre/Grid'
import Main from './Main'
import Navigation from './Navigation'
import { RecoilRoot } from 'recoil'
import { useUser } from '../hooks/user'
import Login from './Login'

export default function App (props) {
  const { isSignedIn, user, logout } = useUser()

  if (!isSignedIn) return <Login />

  return <RecoilRoot>
    <div className='main'>
      <nav>
        <Grid>
          <Row>
            <Column size={2}>
              <div className='top-left-corner'>
                <h1 className='quotrH1'>Quotr</h1>
                <div className='topics-text'>Topics</div>
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
