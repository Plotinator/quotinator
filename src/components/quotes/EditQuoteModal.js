import { useState, useEffect } from 'react'
import { uniq } from 'lodash'
import { Modal, ModalTitle, ModalBody, ModalFooter, ModalHeader } from '../spectre/Modal'
import Button from '../spectre/Button'
import { FormItem, FormLabel } from '../spectre/Form'
import { Grid, Row, Column } from '../spectre/Grid'
import { update } from '@nandorojo/swr-firestore'
import WorksAutoComplete from '../works/WorksAutoComplete'
import TopicsAutoComplete from '../topics/TopicsAutoComplete'
import AuthorsAutoComplete from '../authors/AuthorsAutoComplete'

export default function QuoteModal (props) {
  const quote = props.quote ?? {}
  const [text, setText] = useState(quote.text)
  let intervalId = null

  useEffect(() => {
    setText(quote.text)
    intervalId = setInterval(() => {
      if (quote.text != text) {
        update(`quotes/${quote.id}`, {text: text})
      }
    }, 10000)

    return () => {
      clearInterval(intervalId)
    }
  }, [quote.text])

  const updateText = e => {
    setText(e.target.value)
  }

  const chooseWork = (id, isNew) => {
    update(`quotes/${quote.id}`, {workId: id})
    if (isNew) {
      // TODO: show the work type picker ... maybe

    }
  }

  const chooseTopic = (id) => {
    update(`quotes/${quote.id}`, {topicIds: uniq([...quote.topicIds, id])})
  }

  const removeTopic = (id) => {
    const ids = [...quote.topicIds]
    const idx = ids.indexOf(id)
    ids.splice(idx, 1)
    update(`quotes/${quote.id}`, {topicIds: ids})
  }

  const chooseAuthor = (id) => {
    update(`quotes/${quote.id}`, {authorId: id})
  }

  const finishEditing = () => {
    if (quote.text != text) {
      update(`quotes/${quote.id}`, {text: text})
    }
    props.onClose()
  }

  const renderForm = () => {
    return <div>
      <FormItem>
        <textarea tabIndex='0' className='form-input quote-input' value={text} onChange={updateText} autoFocus placeholder='Write that quote' rows={5}></textarea>
      </FormItem>
      <Grid>
        <Row gaps className='my-2'>
          <Column size={6} className='col-xs-12'>
            <FormItem>
              <FormLabel htmlFor='author-name'>Author</FormLabel>
              <AuthorsAutoComplete chooseAuthor={chooseAuthor} currentAuthorId={quote.authorId} />
            </FormItem>
          </Column>
          <Column size={6} className='col-xs-12'>
            <FormItem>
              <FormLabel>Title of book <span className='text-gray'>(or speech, poem, etc.)</span></FormLabel>
              <WorksAutoComplete chooseWork={chooseWork} currentWorkId={quote.workId} />
            </FormItem>
          </Column>
        </Row>
        <Row gaps className='my-2'>
          <Column size={12}>
            <FormItem>
              <FormLabel>Topics</FormLabel>
              <TopicsAutoComplete chooseTopic={chooseTopic} currentTopicIds={quote.topicIds} removeTopic={removeTopic}/>
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