import "../styles/globals.css";
import "../styles/spectre.scss"
import "../styles/app.scss"
import { Provider } from "react-redux"

import store from '../src/store/configureStore'

function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
}

export default MyApp
