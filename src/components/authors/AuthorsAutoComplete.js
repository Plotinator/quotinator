import { useState } from 'react'
import { AutoComplete, AutoCompleteMenuItem } from '../spectre/AutoComplete'
import { useAuthorsById, useAuthorNamesMap, useAuthors } from '../../hooks/authors'
import { setAuthor } from '../../store/create_functions'
import Chip from '../spectre/Chip'
import { useUser } from '../../hooks/user'

export default function AuthorsAutoComplete (props) {
  const { user } = useUser()
  const { data: allAuthors } = useAuthors()
  const authorsById = useAuthorsById()
  const authorsByName = useAuthorNamesMap()
  const authorNames = Object.keys(authorsByName)
  const [suggestions, setSuggestions] = useState([])
  const [showCurrentAuthor, toggleShowCurrent] = useState(true)

  const suggestAuthors = e => {
    const term = e.target.value
    if (term?.length > 1) {
      let addTerm = true
      let newSuggestions = authorNames.reduce((acc, name) => {
        const author = authorsByName[name]
        if (name.toLowerCase() == term.toLowerCase()) addTerm = false

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
      if (addTerm) {
        newSuggestions.push({id: 'new', name: `Add "${term}"`, actualName: term})
      }
      setSuggestions(newSuggestions)
    } else {
      setSuggestions([])
    }
  }

  const chooseAuthor = (author) => {
    if (author.id == 'new') {
      return createNewAuthor(author.actualName)
    }
    props.chooseAuthor(author.id)
    toggleShowCurrent(true)
    setSuggestions([])
  }

  const createNewAuthor = (val) => {
    const newId = setAuthor({name: val, userId: user?.uid})
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

  return <AutoComplete
    placeholder='Name'
    onChange={suggestAuthors}
    renderItems={renderAuthor}
    suggestions={suggestions}
    allPossible={allAuthors}
    chooseItem={chooseAuthor}
    addNew={createNewAuthor}
    hideInput={showCurrentAuthor && !!props.currentAuthorId}
    defaultInputValue={!showCurrentAuthor && authorsById[props.currentAuthorId].name}
    tabIndex='2'
  />
}