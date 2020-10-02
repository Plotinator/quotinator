import { useState } from 'react'
import { setTopic } from '../../store/create_functions'
import { AutoComplete, AutoCompleteMenuItem } from '../spectre/AutoComplete'
import { useTopicsById, useTopicNamesMap, useNextTopicPosition, useTopics } from '../../hooks/topics'
import TopicChip from '../topics/TopicChip'
import { useUser } from '../../hooks/user'

export default function TopicsAutoComplete (props) {
  const { user } = useUser()
  const { data: allTopics } = useTopics()
  const topicsById = useTopicsById()
  const topicsByName = useTopicNamesMap()
  const topicNames = Object.keys(topicsByName)
  const [suggestions, setSuggestions] = useState([])
  const nextTopicPosition = useNextTopicPosition()

  const suggestTopics = e => {
    const term = e.target.value
    if (term?.length > 1) {
      let addTerm = true
      let newSuggestions = topicNames.reduce((acc, name) => {
        const topic = topicsByName[name]
        if (name.toLowerCase() == term.toLowerCase()) addTerm = false
        // is not one that is already added && term is part of the name
        if (topic && !props.currentTopicIds?.includes(topic.id) && name.toLowerCase().includes(term.toLowerCase())) {
          acc.push(topic)
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

  const chooseTopic = (topic) => {
    if (topic.id == 'new') {
      createNewTopic(topic.actualName)
      setSuggestions([])
      return
    }
    props.chooseTopic(topic.id)
  }

  const createNewTopic = (val) => {
    const newId = setTopic({name: val, position: nextTopicPosition ?? 0, userId: user?.uid})
    props.chooseTopic(newId)
  }

  const renderTopics = () => {
    if (topicsById && props.currentTopicIds?.length) {
      const chips = props.currentTopicIds.map(id => <TopicChip key={id} topic={topicsById[id]} onRemove={() => props.removeTopic(id)}/>)
      return <div style={{flex: '1 0 auto'}}>
        { chips }
      </div>
    } else return null
  }

  return <AutoComplete
    placeholder='Add more topics'
    onChange={suggestTopics}
    renderItems={renderTopics}
    allPossible={allTopics}
    suggestions={suggestions}
    chooseItem={chooseTopic}
    addNew={createNewTopic}
    tabIndex='4'
  />
}
