import React, { useState } from 'react'
import cx from 'classnames'
import { useAuthor } from '../../hooks/authors'
import { useWork } from '../../hooks/works'
import { Card, CardBody, CardFooter } from '../cards/Card'

export default function Work (props) {
  const { work } = props
  const author = useAuthor(work?.authorId)

  const renderAuthor = () => {
    if (author) {
      return <div>
        <span>by</span>
        <h2>{author.name}</h2>
      </div>
    } else return null
  }

  const renderWork = () => {
    if (work) {
      return <h1><i>{work.name}</i></h1>
    } else return null
  }

  return <Card work onClick={() => props.showDetails(work.id)}>
    <CardBody>
      <div className='work__body'>
        { renderWork() }
        { renderAuthor() }
      </div>
    </CardBody>
  </Card>
}