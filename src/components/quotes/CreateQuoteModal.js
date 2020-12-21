import { useState } from 'react'
import { uniq } from 'lodash'
import { Modal, ModalTitle, ModalBody, ModalFooter, ModalHeader } from '../spectre/Modal'
import Button from '../spectre/Button'
import { FormItem } from '../spectre/Form'
import { createQuote } from '../../store/create_functions'
import { useQuotes } from '../../hooks/quotes'
import { useWork, useUpdateWork } from '../../hooks/works'
import { useUser } from '../../hooks/user'
import WorkTypeChooser from '../workTypes/WorkTypeChooser'
import { QuoteMetadata } from './QuoteMetadata'

export default function QuoteModal ({ open, onClose }) {
  const { user } = useUser()
  const [text, setText] = useState('')
  const [notes, setNotes] = useState('')
  const [showNotes, setShowNotes] = useState(false)
  const [workType, setWorkType] = useState(null)
  const [authorId, setAuthorId] = useState(null)
  const [workId, setWorkId] = useState(null)
  const [topicIds, setTopicIds] = useState([])
  const work = useWork(workId)
  const updateWork = useUpdateWork(workId)
  const { add } = useQuotes()

  const updateText = e => {
    setText(e.target.value)
  }

  const updateNotes = e => {
    setNotes(e.target.value)
  }

  const chooseAuthor = (id) => {
    // work was selected, but it has no author id
    if (!authorId && work && updateWork) {
      // work to use this authorId
      updateWork({authorId: id})
    }
    setAuthorId(id)
  }

  const chooseWork = (id, isNew) => {
    setWorkId(id)
  }

  const chooseTopic = (id) => {
    setTopicIds(uniq(topicIds.concat(id)))
  }

  const chooseType = (id) => {
    // update work to use this workTypeId
    if (updateWork) updateWork({workTypeId: id})
  }

  const removeTopic = (id) => {
    const ids = [...topicIds]
    const idx = ids.indexOf(id)
    ids.splice(idx, 1)
    setTopicIds(ids)
  }

  const finishEditing = () => {
    if (!text) return onClose()

    let quote = {text: text, notes: notes, userId: user?.uid}
    if (authorId) quote.authorId = authorId
    if (workId) quote.workId = workId
    if (topicIds.length) quote.topicIds = topicIds
    add(createQuote(quote))
    onClose()
  }

  const renderNotes = () => {
    if (!showNotes) return <a style={{cursor: 'pointer'}} onClick={() => setShowNotes(true)}>Add Notes?</a>

    return <FormItem>
      <textarea className='form-input quote-input' value={notes} onChange={updateNotes} autoFocus placeholder='Notes about the quote' rows={3}></textarea>
    </FormItem>
  }

  const renderWorkDetails = () => {
    return <QuoteMetadata
      workType={workType}
      resetWorkType={() => setWorkType(null)}
      chooseAuthor={chooseAuthor}
      chooseWork={chooseWork}
      chooseTopic={chooseTopic}
      authorId={authorId}
      currentAuthorId={authorId || work?.authorId}
      workId={workId}
      topicIds={topicIds}
      removeTopic={removeTopic}
    />
  }

  return <Modal open={open} onClose={onClose} className='quote-modal'>
    <ModalHeader closeButton onClose={onClose}>
      <ModalTitle className='h5'>Quote</ModalTitle>
    </ModalHeader>
    <ModalBody>
      <div>
        <FormItem>
          <textarea className='form-input quote-input' value={text} onChange={updateText} autoFocus placeholder='Write that quote' rows={5}></textarea>
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
