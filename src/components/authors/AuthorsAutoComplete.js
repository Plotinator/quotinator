import { useState } from 'react'
import { AutoComplete, AutoCompleteMenuItem } from '../spectre/AutoComplete'
import hardCodedUserId from '../../store/hardCodedUserId'
import { useAuthorsById, useAuthorNamesMap } from '../../hooks/authors'
import { setAuthor } from '../../store/create_functions'
import Chip from '../spectre/Chip'

export default function AuthorsAutoComplete (props) {
  const authorsById = useAuthorsById()
  const authorsByName = useAuthorNamesMap()
  const authorNames = Object.keys(authorsByName)
  const [suggestions, setSuggestions] = useState([])
  const [showCurrentAuthor, toggleShowCurrent] = useState(true)

  const suggestAuthors = e => {
    const term = e.target.value
    if (term?.length > 1) {
      const newSuggestions = authorNames.reduce((acc, name) => {
        const author = authorsByName[name]
        if (!showCurrentAuthor) {
          if (name.toLowerCase().includes(term.toLowerCase())) acc.push(author)
        } else {
          // is not one that is already added && term is part of the name
          if (author && props.currentAuthorId != author.id && name.toLowerCase().includes(term.toLowerCase())) {
            acc.push(author)
          }
        }
        return acc
      }, [])
      setSuggestions(newSuggestions)
    } else {
      setSuggestions([])
    }
  }

  const chooseAuthor = (id) => {
    props.chooseAuthor(id)
    toggleShowCurrent(true)
    setSuggestions([])
  }

  const createNewAuthor = (val) => {
    const newId = setAuthor({name: val, userId: hardCodedUserId})
    props.chooseAuthor(newId)
    toggleShowCurrent(true)
    setSuggestions([])
  }

  const resetAuthor = () => {
    toggleShowCurrent(false)
  }

  const renderAuthor = () => {
    if (showCurrentAuthor && authorsById && props.currentAuthorId && authorsById[props.currentAuthorId]?.name) {
      return <div className='px-1' onClick={resetAuthor}>{authorsById[props.currentAuthorId].name}</div>
    } else return null
  }

  const renderSuggestions = () => {
    if (!suggestions.length) return null
    return suggestions.map(work => <AutoCompleteMenuItem key={work.id} onChoose={() => chooseAuthor(work.id)}>{work.name}</AutoCompleteMenuItem>)
  }

  return <AutoComplete
    placeholder='Name'
    onChange={suggestAuthors}
    renderItems={renderAuthor}
    suggestions={suggestions}
    renderSuggestions={renderSuggestions}
    addNew={createNewAuthor}
    hideInput={showCurrentAuthor && !!props.currentAuthorId}
    defaultInputValue={!showCurrentAuthor && authorsById[props.currentAuthorId].name}
    tabIndex='1'
  />
}