import React, { useState, useEffect } from 'react'
import { Grid, Row, Column } from '../spectre/Grid'
import { FormItem, FormLabel } from '../spectre/Form'
import AuthorsAutoComplete from '../authors/AuthorsAutoComplete'
import WorksAutoComplete from '../works/WorksAutoComplete'
import TopicsAutoComplete from '../topics/TopicsAutoComplete'
import { WORKTYPES } from '../../store/initialState'
import { update } from '@nandorojo/swr-firestore'
import { useWork } from '../../hooks/works'

export function QuoteMetadata (props) {
  const {
    workType,
    resetWorkType,
    chooseAuthor,
    chooseWork,
    chooseTopic,
    authorId,
    workId,
    topicIds,
    removeTopic,
    currentAuthorId,
    eventId,
  } = props

  const [currentEventId, setCurrentEventId] = useState(eventId)
  const event = useWork(currentEventId)
  useEffect(() => {
    // update the event's workIds to include the workId
    if (workId && currentEventId && !event?.workIds?.includes(workId)) {
      const newWorkIds = event.workIds?.length ? [...event.workIds, workId] : [workId]
      update(`works/${currentEventId}`, {workIds: newWorkIds})
    }
  }, [workId, event])

  const chooseEvent = (id) => {
    setCurrentEventId(id)
  }

  let typeForTitle = workType
  let typeForInput = workType
  let topMeta = null
  let bottomMeta = null
  if (workType == WORKTYPES.event) {
    typeForInput = WORKTYPES.speech
    topMeta = <Row className='my-2'>
      <Column size={6} className='col-xs-12'>
        <FormItem>
          <FormLabel>Title of event</FormLabel>
          <WorksAutoComplete chooseWork={chooseEvent} currentWorkId={currentEventId} authorId={null} workType={WORKTYPES.event} />
        </FormItem>
      </Column>
    </Row>
  }
  if (workType == WORKTYPES.poem) {

  }
  if (workType == WORKTYPES.scripture) {

  }
  if (workType == WORKTYPES.movie) {
    typeForTitle = 'Movie / Show'
  }
  return <Grid>
    <Row className='my-2'>
      <Column size={12} className='text-center'>
        <h4 className='work-type'>{typeForTitle}</h4>
        <small><a href='#' onClick={resetWorkType}>change</a></small>
      </Column>
    </Row>
    { topMeta }
    <Row gaps className='my-2'>
      <Column size={6} className='col-xs-12'>
        <FormItem>
          <FormLabel htmlFor='author-name'><span className='work-type'>{typeForInput}</span> by who?</FormLabel>
          <AuthorsAutoComplete chooseAuthor={chooseAuthor} currentAuthorId={currentAuthorId} />
        </FormItem>
      </Column>
      <Column size={6} className='col-xs-12'>
        <FormItem>
          <FormLabel>Title of {typeForInput}</FormLabel>
          <WorksAutoComplete chooseWork={chooseWork} currentWorkId={workId} authorId={authorId} workType={typeForInput} />
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
    { bottomMeta }
  </Grid>
}