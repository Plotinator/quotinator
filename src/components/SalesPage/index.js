import { Grid, Column, Row } from '../spectre/Grid'
import { RecoilRoot } from 'recoil'
import { useUser } from '../../hooks/user'
import SplashScreen from '../SplashScreen'
import Button from '../spectre/Button'

export default function SalesPage (props) {
  const { isSignedIn, user } = useUser()

  console.log(user)

  return <RecoilRoot>
    <nav className='sales__nav'>
      <div></div>
      <div className='right'>
        <Button className='btn-sm'>Login</Button>
      </div>
    </nav>
    <main className='sales__main'>
      <div className='main__inner'>
        <Grid>
          <Row>
            <Column size={4} className='sales__hero-container col-mx-auto'>
              <h1 className='quotrH1'>Quotr</h1>
            </Column>
          </Row>
          <Row>
            <Column size={12} className='col-mx-auto'>
              <h2>Visually organize your quotes!</h2>
            </Column>
          </Row>
          <Row gaps className='feature-row'>
            <Column size={6}>
              <FeatureText>
                <h3>Easy to Use</h3>
                <p>It's not complicated. Quotes are organized by who said them and what they're about.</p>
              </FeatureText>
            </Column>
            <Column size={6}>
              <img className="img-responsive rounded" src="https://picturepan2.github.io/spectre/img/osx-el-capitan.jpg" alt="macOS El Capitan Wallpaper"/>
            </Column>
          </Row>
          <Row gaps className='feature-row'>
            <Column size={6}>
              <img className="img-responsive rounded" src="https://picturepan2.github.io/spectre/img/osx-el-capitan.jpg" alt="macOS El Capitan Wallpaper"/>
            </Column>
            <Column size={6}>
              <FeatureText>
                <h3>Tag with Topics</h3>
                <p>Need to find that one quote about freedom that you loved? Easy</p>
                <p>Tag a quote with as many topics as you want.</p>
              </FeatureText>
            </Column>
          </Row>
          <Row gaps className='feature-row'>
            <Column size={6}>
              <FeatureText>
                <h3>All your quotes from Books, Speeches, Authors, etc.</h3>
                <p>Want to see all the great quotes from that book you read last year? Easy</p>
              </FeatureText>
            </Column>
            <Column size={6}>
              <img className="img-responsive rounded" src="https://picturepan2.github.io/spectre/img/osx-el-capitan.jpg" alt="macOS El Capitan Wallpaper"/>
            </Column>
          </Row>
          <CTA />
          <Row gaps className='feature-row'>
            <Column size={6}>
              <img className="img-responsive rounded" src="https://picturepan2.github.io/spectre/img/osx-el-capitan.jpg" alt="macOS El Capitan Wallpaper"/>
            </Column>
            <Column size={6}>
              <FeatureText>
                <h3>Favorites</h3>
                <p>Star a quote to easily find your favorites at the top</p>
              </FeatureText>
            </Column>
          </Row>
          <Row gaps className='feature-row'>
            <Column size={6}>
              <FeatureText>
                <h3>Stay Organized</h3>
                <p>Write a quote quickly and organize it later without losing track of it</p>
              </FeatureText>
            </Column>
            <Column size={6}>
              <img className="img-responsive rounded" src="https://picturepan2.github.io/spectre/img/osx-el-capitan.jpg" alt="macOS El Capitan Wallpaper"/>
            </Column>
          </Row>
          <CTA />
        </Grid>
      </div>
      <footer className='sales__footer'>
        <p>From the maker of <a href='https://getplottr.com'>Plottr</a>, invented by his wife </p>
      </footer>
    </main>
  </RecoilRoot>
}

function FeatureText ({children}) {
  return <div className='feature-text'>
    { children }
  </div>
}

function CTA (props) {
  return <Row>
    <Column size={6} className='col-mx-auto'>
      <div className='cta'>
        <h3>Try it for Free</h3>
        <p>Free for 30 days and then just $3.99/month</p>
        <Button className='btn-success btn-lg btn-block'>Try it Now</Button>
      </div>
    </Column>
  </Row>
}
