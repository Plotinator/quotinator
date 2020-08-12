import Head from "next/head"
// import styles from "../styles/Home.module.css"
import GridView from '../src/components/grid/GridView'
import CardView from '../src/components/cards/CardView'

export default function Home() {
  return (
    <div className='quotr-root'>
      <Head>
        <title>Quotr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <GridView />
        <CardView />
      </main>

      <footer>
      </footer>
    </div>
  )
}
