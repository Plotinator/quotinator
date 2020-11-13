import { Grid, Column, Row } from './spectre/Grid'
import Main from './Main'
import Navigation from './Navigation'
import { RecoilRoot } from 'recoil'
import { useUser } from '../hooks/user'
import Login from './Login'
import SplashScreen from './SplashScreen'

export default function App (props) {
  const { checking, isSignedIn, logout } = useUser()

  if (checking) return <SplashScreen />

  if (!checking && !isSignedIn) return <Login />

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
