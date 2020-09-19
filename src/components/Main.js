import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { openedQuoteModal } from '../recoil/atoms'
import { Grid, Row } from './spectre/Grid'
import Button from './spectre/Button'
import TopicsSidebar from './topics/TopicsSidebar'
import CardGridWrapper from './cards/CardGridWrapper'
import { IoIosAdd } from 'react-icons/io'
import CreateQuoteModal from './quotes/CreateQuoteModal'
import EditQuoteModal from './quotes/EditQuoteModal'
import { useQuote } from '../hooks/quotes'

export default function Main (props) {
  const [isCreateOpen, toggleCreate] = useState(false)
  const [editId, toggleEdit] = useRecoilState(openedQuoteModal)
  const quote = useQuote(editId) // TODO: this might get be a problem for optimizing the first render

  // TODO: handle pressing esc to close modal

  return <main>
    <Grid>
      <Row className='mainWrapper'>
        <TopicsSidebar />
        <CardGridWrapper />
      </Row>
    </Grid>
    <Button className='btn-primary btn-action s-circle circle-add-button' onClick={() => toggleCreate(true)}><IoIosAdd /></Button>
    {isCreateOpen ? <CreateQuoteModal open={true} onClose={() => toggleCreate(false)}/> : null }
    {editId ? <EditQuoteModal open={true} quote={quote} onClose={() => toggleEdit(null)}/> : null }
  </main>
}