import React, { useState } from 'react'
import cx from 'classnames'
import { Card, CardBody, CardFooter } from '../cards/Card'
import { IoMdPerson } from 'react-icons/io'

export default function Author (props) {
  const { author } = props

  const renderName = () => {
    if (author) {
      return <h1>{author.name}</h1>
    } else return null
  }

  return <Card author onClick={() => props.showDetails(author.id)}>
    <CardBody>
      <div className='author__body'>
        { renderName() }
        <IoMdPerson />
      </div>
    </CardBody>
  </Card>
}