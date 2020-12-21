import React from 'react'
import { Grid, Row, Column } from '../spectre/Grid'
import { FormItem, FormLabel } from '../spectre/Form'
import AuthorsAutoComplete from '../authors/AuthorsAutoComplete'
import WorksAutoComplete from '../works/WorksAutoComplete'
import TopicsAutoComplete from '../topics/TopicsAutoComplete'
import { WORKTYPES } from '../../store/initialState'

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
  } = props

  let typeString = workType
  if (workType == WORKTYPES.event) {

  }
  if (workType == WORKTYPES.poem) {

  }
  if (workType == WORKTYPES.scripture) {

  }
  if (workType == WORKTYPES.movie) {
    typeString = 'Movie / Show'
  }
  return <Grid>
    <Row className='my-2'>
      <Column size={12} className='text-center'>
        <h4 className='work-type'>{typeString}</h4>
        <small><a href='#' onClick={resetWorkType}>change</a></small>
      </Column>
    </Row>
    <Row gaps className='my-2'>
      <Column size={6} className='col-xs-12'>
        <FormItem>
          <FormLabel htmlFor='author-name'>By who?</FormLabel>
          <AuthorsAutoComplete chooseAuthor={chooseAuthor} currentAuthorId={currentAuthorId} />
        </FormItem>
      </Column>
      <Column size={6} className='col-xs-12'>
        <FormItem>
          <FormLabel>Title of {workType}</FormLabel>
          <WorksAutoComplete chooseWork={chooseWork} currentWorkId={workId} authorId={authorId} workType={workType} />
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
}