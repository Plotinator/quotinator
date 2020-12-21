import { useState, useEffect } from 'react'
import { uniq } from 'lodash'
import { Modal, ModalTitle, ModalBody, ModalFooter, ModalHeader } from '../spectre/Modal'
import Button from '../spectre/Button'
import { FormItem } from '../spectre/Form'
import { update } from '@nandorojo/swr-firestore'
import WorkTypeChooser from '../workTypes/WorkTypeChooser'
import { QuoteMetadata } from './QuoteMetadata'
import { useWork } from '../../hooks/works'

export default function QuoteModal (props) {
  const quote = props.quote ?? {}
  const [text, setText] = useState(quote.text)
  const [notes, setNotes] = useState(quote.notes)
  const [showNotes, setShowNotes] = useState(false)
  const work = useWork(quote.workId)
  const [workType, setWorkType] = useState(work?.workType)
  let intervalId = null

  useEffect(() => {
    setText(quote.text)

    // clear previous interval if any
    if (intervalId) clearInterval(intervalId)

    intervalId = setInterval(() => {
      if (quote.text != text || quote.notes != notes) {
        update(`quotes/${quote.id}`, {text: text, notes: notes})
      }
    }, 10000)

    return () => clearInterval(intervalId)
  }, [quote.text])

  const updateText = e => {
    setText(e.target.value)
  }

  const updateNotes = e => {
    setNotes(e.target.value)
  }

  const chooseWork = (id, isNew) => {
    update(`quotes/${quote.id}`, {workId: id})
    if (isNew) {
      // TODO: do anything?

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
    if (quote.text != text || quote.notes != notes) {
      update(`quotes/${quote.id}`, {text: text, notes: notes})
    }
    props.onClose()
  }

  const renderNotes = () => {
    if (!showNotes) return <a style={{cursor: 'pointer'}} onClick={() => setShowNotes(true)}>show/edit notes</a>

    return <FormItem>
      <textarea tabIndex='1' className='form-input quote-input' value={notes} onChange={updateNotes} autoFocus placeholder='Notes about the quote' rows={3}></textarea>
    </FormItem>
  }

  const renderWorkDetails = () => {
    return <QuoteMetadata
      workType={workType}
      resetWorkType={() => setWorkType(null)}
      chooseAuthor={chooseAuthor}
      chooseWork={chooseWork}
      chooseTopic={chooseTopic}
      authorId={quote.authorId}
      currentAuthorId={quote.authorId}
      workId={quote.workId}
      topicIds={quote.topicIds}
      removeTopic={removeTopic}
    />
  }

  return <Modal open={props.open} onClose={props.onClose} className='quote-modal'>
    <ModalHeader closeButton onClose={props.onClose}>
      <ModalTitle className='h5'>Quote</ModalTitle>
    </ModalHeader>
    <ModalBody>
      <div>
        <FormItem>
          <textarea tabIndex='0' className='form-input quote-input' value={text} onChange={updateText} autoFocus placeholder='Write that quote' rows={5}></textarea>
        </FormItem>
        { renderNotes() }
        <div className='divider'/>
        { workType ? renderWorkDetails() : <WorkTypeChooser choose={setWorkType}/> }
      </div>
    </ModalBody>
    <ModalFooter className='quote-footer'>
      <Button className='btn-primary' onClick={finishEditing}>Done</Button>
    </ModalFooter>
  </Modal>
}