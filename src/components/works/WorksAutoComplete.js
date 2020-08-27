import { useState } from 'react'
import { AutoComplete, AutoCompleteMenuItem } from '../spectre/AutoComplete'
import hardCodedUserId from '../../store/hardCodedUserId'
import { useWorksById, useWorkNamesMap } from '../../hooks/works'
import { setWork } from '../../store/create_functions'

export default function WorksAutoComplete (props) {
  const worksById = useWorksById()
  const worksByName = useWorkNamesMap()
  const workNames = Object.keys(worksByName)
  const [suggestions, setSuggestions] = useState([])
  const [showCurrentWork, toggleShowCurrent] = useState(true)

  const suggestWorks = e => {
    const term = e.target.value
    if (term?.length > 1) {
      const newSuggestions = workNames.reduce((acc, name) => {
        const work = worksByName[name]
        // is not one that is already added && term is part of the name
        if (!showCurrentWork) {
          if (name.toLowerCase().includes(term.toLowerCase())) acc.push(work)
        } else {
          if (work && props.currentWorkId != work.id && name.toLowerCase().includes(term.toLowerCase())) {
            acc.push(work)
          }
        }
        return acc
      }, [])
      setSuggestions(newSuggestions)
    } else {
      setSuggestions([])
    }
  }

  const chooseWork = (id) => {
    props.chooseWork(id, false)
    toggleShowCurrent(true)
    setSuggestions([])
  }

  const createNewWork = (val) => {
    const newId = setWork({name: val, userId: hardCodedUserId})
    props.chooseWork(newId, true)
    toggleShowCurrent(true)
    setSuggestions([])
  }

  const resetWork = () => {
    toggleShowCurrent(false)
  }

  const renderWork = () => {
    if (showCurrentWork && worksById && props.currentWorkId && worksById[props.currentWorkId]?.name) {
      return <div className='px-1' onClick={resetWork}>{worksById[props.currentWorkId].name}</div>
    } else return null
  }

  const renderSuggestions = () => {
    if (!suggestions.length) return null
    return suggestions.map(work => <AutoCompleteMenuItem key={work.id} onChoose={() => chooseWork(work.id)}>{work.name}</AutoCompleteMenuItem>)
  }

  return <AutoComplete
    placeholder='Title'
    onChange={suggestWorks}
    renderItems={renderWork}
    suggestions={suggestions}
    renderSuggestions={renderSuggestions}
    addNew={createNewWork}
    hideInput={showCurrentWork && !!props.currentWorkId}
    defaultInputValue={!showCurrentWork && worksById[props.currentWorkId].name}
    tabInput='3'
  />
}