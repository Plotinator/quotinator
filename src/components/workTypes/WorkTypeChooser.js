import React from 'react'
import { Grid, Row, Column } from '../spectre/Grid'
import WorkTypeButton from './WorkTypeButton'
import { WORKTYPES } from '../../store/initialState'

export default function WorkTypeChooser ({ choose }) {
  return <Grid className='work-type__chooser__grid'>
    <h5>Where did this quote come from?</h5>
    <Row gaps>
      <Column size={6}>
        <WorkTypeButton onClick={() => choose(WORKTYPES.book)}>Book</WorkTypeButton>
      </Column>
      <Column size={6}>
        <WorkTypeButton onClick={() => choose(WORKTYPES.speech)}>Speech</WorkTypeButton>
      </Column>
    </Row>
    <Row gaps>
      <Column size={6}>
        <WorkTypeButton onClick={() => choose(WORKTYPES.event)}>Event</WorkTypeButton>
      </Column>
      <Column size={6}>
        <WorkTypeButton onClick={() => choose(WORKTYPES.movie)}>Movie / Show</WorkTypeButton>
      </Column>
    </Row>
    <Row gaps>
      <Column size={6}>
        <WorkTypeButton onClick={() => choose(WORKTYPES.scripture)}>Scripture</WorkTypeButton>
      </Column>
      <Column size={6}>
        <WorkTypeButton onClick={() => choose(WORKTYPES.poem)}>Poem</WorkTypeButton>
      </Column>
    </Row>
  </Grid>
}