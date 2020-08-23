import { useState } from 'react'
import { Grid, Row } from './spectre/Grid'
import Button from './spectre/Button'
import TopicsSidebar from './topics/TopicsSidebar'
import CardGridWrapper from './cards/CardGridWrapper'
import { IoIosAdd } from 'react-icons/io'
import CreateQuoteModal from './quotes/CreateQuoteModal'

export default function Main (props) {
  const [isModalOpen, setOpen] = useState(false)

  return <main>
    <Grid>
      <Row className='mainWrapper'>
        <TopicsSidebar />
        <CardGridWrapper />
      </Row>
    </Grid>
    <Button className='btn-primary btn-action s-circle circle-add-button' onClick={() => setOpen(true)}><IoIosAdd /></Button>
    {isModalOpen ? <CreateQuoteModal open={true} onClose={() => setOpen(false)}/> : null }
  </main>
}