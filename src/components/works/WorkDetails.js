import React from 'react'
import { Grid, Row, Column } from '../spectre/Grid'
import { useAuthor } from '../../hooks/authors'
import { useWork } from '../../hooks/works'
import QuoteList from '../quotes/QuoteList'
import Button from '../spectre/Button'

export default function WorkDetails (props) {
  const { workId, quotes } = props
  const work = useWork(workId)
  const author = useAuthor(work?.authorId)

  return <Row gaps className='work-details'>
    <Column size={5}>
      <Button className='btn-sm' onClick={props.goBack}>
        <i className="icon icon-arrow-left" />{' '}back
      </Button>
      <h1>{work?.name}</h1>
      <h2><small>by</small>{' '}{author?.name}</h2>
    </Column>
    <Column size={7}>
      <QuoteList quotes={quotes} />
    </Column>
  </Row>
}