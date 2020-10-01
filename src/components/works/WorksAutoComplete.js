import { useState, useEffect } from 'react'
import { AutoComplete, AutoCompleteMenuItem } from '../spectre/AutoComplete'
import hardCodedUserId from '../../store/hardCodedUserId'
import { useWorksById, useWorkNamesMap, useWorks } from '../../hooks/works'
import { setWork } from '../../store/create_functions'

export default function WorksAutoComplete (props) {
  const { data: allWorks } = useWorks()
  const [filteredWorks, setFilteredWorks] = useState(props.authorId && allWorks ? allWorks.filter(w => w.authorId == props.authorId) : allWorks)
  const worksById = useWorksById()
  const worksByName = useWorkNamesMap()
  const workNames = Object.keys(worksByName)
  const [suggestions, setSuggestions] = useState([])
  const [showCurrentWork, toggleShowCurrent] = useState(true)

  useEffect(() => {
    if (props.authorId && allWorks) {
      setFilteredWorks(allWorks.filter(w => w.authorId == props.authorId))
    }
  }, [allWorks, props.authorId])

  const suggestWorks = e => {
    const term = e.target.value
    if (term?.length > 1) {
      let addTerm = true
      let newSuggestions = workNames.reduce((acc, name) => {
        const work = worksByName[name]
        // if there is an authorId given, only show suggestions from that author
        if (props.authorId && work.authorId != props.authorId) return acc
        if (name.toLowerCase() == term.toLowerCase()) addTerm = false

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
      if (addTerm) {
        newSuggestions.push({id: 'new', name: `Add "${term}"`, actualName: term})
      }
      setSuggestions(newSuggestions)
    } else {
      setSuggestions([])
    }
  }

  const chooseWork = (work) => {
    if (work.id == 'new') {
      return createNewWork(work.actualName)
    }
    props.chooseWork(work.id, false)
    toggleShowCurrent(true)
    setSuggestions([])
  }

  const createNewWork = (val) => {
    const newId = setWork({name: val, authorId: props.authorId, userId: hardCodedUserId})
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

  return <AutoComplete
    placeholder='Title'
    onChange={suggestWorks}
    renderItems={renderWork}
    suggestions={suggestions}
    allPossible={filteredWorks}
    chooseItem={chooseWork}
    addNew={createNewWork}
    hideInput={showCurrentWork && !!props.currentWorkId}
    defaultInputValue={!showCurrentWork && worksById[props.currentWorkId].name}
    tabInput='3'
  />
}