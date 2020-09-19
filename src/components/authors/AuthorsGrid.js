import React, { useState } from 'react'
import CardGrid from '../cards/CardGrid'
import Author from './Author'
import AuthorDetails from './AuthorDetails'
import { useFilterAndGroupQuotes } from '../../hooks/common'
import { useAuthorsById, useAuthors } from '../../hooks/authors'

export default function AuthorsGrid (props) {
  const { quotes } = props
  const { data: authors } = useAuthors()
  const [showDetailsId, setShowDetails] = useState(null)
  const groupedQuotes = useFilterAndGroupQuotes(quotes, 'authorId')
  if (!authors) return null

  const showDetails = (id) => setShowDetails(id)

  if (showDetailsId) {
    return <AuthorDetails authorId={showDetailsId} quotes={groupedQuotes[showDetailsId]} goBack={() => setShowDetails(null)}/>
  } else {
    return <CardGrid items={authors} renderItem={a => <Author key={a.id} author={a} showDetails={showDetails} />} />
  }
}
