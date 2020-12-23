import React, { useState } from 'react'
import { Grid, Row, Column } from '../spectre/Grid'
import { useAuthor } from '../../hooks/authors'
import { useWork } from '../../hooks/works'
import QuoteList from '../quotes/QuoteList'
import Button from '../spectre/Button'
import { FormItem } from '../spectre/Form'
import { update } from '@nandorojo/swr-firestore'

export default function WorkDetails (props) {
  const { workId, quotes } = props
  const [editing, setEditing] = useState(false)
  const work = useWork(workId)
  const author = useAuthor(work?.authorId)
  const [workName, setWorkName] = useState(work?.name)

  const handleKeyPress = (e) => {
    if (e.which == 13) {
      updateWorkName()
    }
  }

  const handleKeyDown = (e) => {
    if (e.which == 27) {
      setEditing(false)
    }
  }

  const updateWorkName = () => {
    update(`works/${work?.id}`, {name: workName})
    setEditing(false)
  }

  let nameField = <span>{work?.name}</span>
  if (editing) {
    nameField = <FormItem>
      <input type='text' value={workName} autoFocus onChange={e => setWorkName(e.target.value)} onKeyPress={handleKeyPress} onKeyDown={handleKeyDown}/>
      <Button className='btn-sm' onClick={updateWorkName}>Save</Button>
      <Button className='btn-sm btn-link' onClick={() => setEditing(false)}>Cancel</Button>
    </FormItem>
  }

  return <Row gaps className='work-details'>
    <Column size={5}>
      <Button className='btn-sm' onClick={props.goBack}>
        <i className="icon icon-arrow-left" />{' '}back
      </Button>
      <h1>
        { nameField }
        {editing ? null : <Button className='btn-sm btn-link' onClick={() => setEditing(true)}>edit</Button>}
      </h1>
      <h2><small>by</small>{' '}{author?.name}</h2>
    </Column>
    <Column size={7}>
      <QuoteList quotes={quotes} />
    </Column>
  </Row>
}