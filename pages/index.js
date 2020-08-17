import Head from "next/head"
import 'firebase/firestore'
import 'firebase/auth'
import { Fuego, FuegoProvider } from '@nandorojo/swr-firestore'
import App from "../src/components/App"

export default function Home(props) {
  const fuego = new Fuego(props.firebaseConfig)

  return (
    <div className='quotr-root'>
      <Head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Quotr</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;700&family=Open+Sans:wght@400;700&family=Pacifico&display=swap" rel="stylesheet" />
      </Head>

      <FuegoProvider fuego={fuego}>
        <App/>
      </FuegoProvider>
    </div>
  )
}

export async function getStaticProps(context) {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: process.env.FIREBASE_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_BUCKET,
    messagingSenderId: process.env.FIREBASE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  }

  return {
    props: { firebaseConfig }, // will be passed to the page component as props
  }
}
