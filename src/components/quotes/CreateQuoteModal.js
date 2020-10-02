import { useState } from 'react'
import { uniq } from 'lodash'
import { Modal, ModalTitle, ModalBody, ModalFooter, ModalHeader } from '../spectre/Modal'
import Button from '../spectre/Button'
import { Grid, Row, Column } from '../spectre/Grid'
import { FormItem, FormLabel } from '../spectre/Form'
import { useCollection } from '@nandorojo/swr-firestore'
import { createQuote } from '../../store/create_functions'
import AuthorsAutoComplete from '../authors/AuthorsAutoComplete'
import WorksAutoComplete from '../works/WorksAutoComplete'
import TopicsAutoComplete from '../topics/TopicsAutoComplete'
import { useQuotes } from '../../hooks/quotes'
import { useWork } from '../../hooks/works'
import { useUser } from '../../hooks/user'

export default function QuoteModal (props) {
  const { user } = useUser()
  const [text, setText] = useState('')
  const [notes, setNotes] = useState('')
  const [showNotes, setShowNotes] = useState(false)
  const [authorId, setAuthorId] = useState(null)
  const [workId, setWorkId] = useState(null)
  const [topicIds, setTopicIds] = useState([])
  const work = useWork(workId)
  const { add } = useQuotes()

  const updateText = e => {
    setText(e.target.value)
  }

  const updateNotes = e => {
    setNotes(e.target.value)
  }

  const chooseAuthor = (id) => {
    setAuthorId(id)
  }

  const chooseWork = (id, isNew) => {
    setWorkId(id)
  }

  const chooseTopic = (id) => {
    setTopicIds(uniq(topicIds.concat(id)))
  }

  const removeTopic = (id) => {
    const ids = [...topicIds]
    const idx = ids.indexOf(id)
    ids.splice(idx, 1)
    setTopicIds(ids)
  }

  const finishEditing = () => {
    if (!text) return props.onClose()

    let quote = {text: text, notes: notes, userId: user?.uid}
    if (authorId) quote.authorId = authorId
    if (workId) quote.workId = workId
    if (topicIds.length) quote.topicIds = topicIds
    add(createQuote(quote))
    props.onClose()
  }

  const renderNotes = () => {
    if (!showNotes) return <a style={{cursor: 'pointer'}} onClick={() => setShowNotes(true)}>Add Notes?</a>

    return <FormItem>
      <textarea className='form-input quote-input' value={notes} onChange={updateNotes} autoFocus placeholder='Notes about the quote' rows={3}></textarea>
    </FormItem>
  }

  const renderForm = () => {
    return <div>
      <FormItem>
        <textarea className='form-input quote-input' value={text} onChange={updateText} autoFocus placeholder='Write that quote' rows={5}></textarea>
      </FormItem>
      { renderNotes() }
      <Grid>
        <Row gaps className='my-2'>
          <Column size={6} className='col-xs-12'>
            <FormItem>
              <FormLabel htmlFor='author-name'>By who?</FormLabel>
              <AuthorsAutoComplete chooseAuthor={chooseAuthor} currentAuthorId={authorId || work?.authorId} />
            </FormItem>
          </Column>
          <Column size={6} className='col-xs-12'>
            <FormItem>
              <FormLabel>Title of book <span className='text-gray'>(or speech, poem, etc.)</span></FormLabel>
              <WorksAutoComplete chooseWork={chooseWork} currentWorkId={workId} authorId={authorId} />
            </FormItem>
          </Column>
        </Row>
        <Row gaps className='my-2'>
          <Column size={12}>
            <FormItem>
              <FormLabel>Topics</FormLabel>
              <TopicsAutoComplete chooseTopic={chooseTopic} currentTopicIds={topicIds} removeTopic={removeTopic}/>
            </FormItem>
          </Column>
        </Row>
      </Grid>
    </div>
  }

  return <Modal open={props.open} onClose={props.onClose} className='quote-modal'>
    <ModalHeader closeButton onClose={props.onClose}>
      <ModalTitle className='h5'>Quote</ModalTitle>
    </ModalHeader>
    <ModalBody>
      { renderForm() }
    </ModalBody>
    <ModalFooter className='quote-footer'>
      <Button className='btn-primary' onClick={finishEditing}>Done</Button>
    </ModalFooter>
  </Modal>
}