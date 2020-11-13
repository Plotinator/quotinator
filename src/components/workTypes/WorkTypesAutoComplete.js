import { useState, useEffect } from 'react'
import { AutoComplete } from '../spectre/AutoComplete'
import { useUser } from '../../hooks/user'
import { useSortedWorkTypes, useWorkTypesById, useWorkTypeNamesMap } from '../../hooks/workTypes'

export default function WorkTypesAutoComplete (props) {
  const { user } = useUser()
  const { data: allTypes } = useSortedWorkTypes()
  const [filteredTypes, setFilteredTypes] = useState(props.selectedId && allTypes ? allTypes.filter(t => t.id == props.selectedId) : allTypes)
  const typesById = useWorkTypesById()
  const typesByName = useWorkTypeNamesMap()
  const typeNames = Object.keys(typesByName)
  const [suggestions, setSuggestions] = useState([])
  const [showSelectedType, toggleShowSelected] = useState(true)

  useEffect(() => {
    if (props.selectedId && allTypes) {
      setFilteredTypes(allTypes.filter(t => t.id == props.selectedId))
    }
  }, [allTypes, props.selectedId])

  const suggestWorks = e => {
    const term = e.target.value
    if (term?.length > 1) {
      let addTerm = true
      let newSuggestions = typeNames.reduce((acc, name) => {
        const work = typesByName[name]
        // if there is an authorId given, only show suggestions from that author
        if (name.toLowerCase() == term.toLowerCase()) addTerm = false

        // is not one that is already added && term is part of the name
        if (!showSelectedType) {
          if (name.toLowerCase().includes(term.toLowerCase())) acc.push(work)
        } else {
          if (work && props.selectedId != work.id && name.toLowerCase().includes(term.toLowerCase())) {
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

  const chooseType = (work) => {
    if (work.id == 'new') {
      return createNewWork(work.actualName)
    }
    props.chooseType(work.id, false)
    toggleShowSelected(true)
    setSuggestions([])
  }

  const createNewWork = (val) => {
    // const newId = setWorkType({name: val, authorId: props.selectedId, userId: user?.uid})
    // props.chooseType(newId, true)
    // toggleShowSelected(true)
    // setSuggestions([])
  }

  const resetType = () => {
    toggleShowSelected(false)
  }

  const renderType = () => {
    if (showSelectedType && typesById && props.selectedId && typesById[props.selectedId]?.name) {
      return <div className='px-1' onClick={resetType}>{typesById[props.selectedId].name}</div>
    } else return null
  }

  return <AutoComplete
    placeholder='Title'
    onChange={suggestWorks}
    renderItems={renderType}
    suggestions={suggestions}
    allPossible={filteredTypes}
    chooseItem={chooseType}
    addNew={createNewWork}
    hideInput={showSelectedType && !!props.selectedId}
    defaultInputValue={!showSelectedType && typesById[props.selectedId].name}
    tabInput='3'
  />
}