import { useState } from 'react'
import { setTopic } from '../../store/create_functions'
import { AutoComplete, AutoCompleteMenuItem } from '../spectre/AutoComplete'
import { useTopicsById, useTopicNamesMap } from '../../hooks/topics'
import TopicChip from '../topics/TopicChip'

export default function TopicsAutoComplete (props) {
  const topicsById = useTopicsById()
  const topicsByName = useTopicNamesMap()
  const topicNames = Object.keys(topicsByName)
  const [suggestions, setSuggestions] = useState([])

  const suggestTopics = e => {
    const term = e.target.value
    if (term?.length > 1) {
      const newSuggestions = topicNames.reduce((acc, name) => {
        const topic = topicsByName[name]
        // is not one that is already added && term is part of the name
        if (topic && !props.currentTopicIds?.includes(topic.id) && name.toLowerCase().includes(term.toLowerCase())) {
          acc.push(topic)
        }
        return acc
      }, [])
      setSuggestions(newSuggestions)
    } else {
      setSuggestions([])
    }
  }

  const chooseTopic = (id) => {
    props.chooseTopic(id)
  }

  const createNewTopic = (val) => {
    const newId = setTopic({name: val, userId: hardCodedUserId})
    props.chooseTopic(newId)
  }

  const renderTopics = () => {
    if (topicsById && props.currentTopicIds?.length) {
      return props.currentTopicIds.map(id => <TopicChip key={id} topic={topicsById[id]} onRemove={() => props.removeTopic(id)}/>)
    } else return null
  }

  const renderSuggestions = () => {
    if (!suggestions.length) return null
    return suggestions.map(topic => <AutoCompleteMenuItem key={topic.id} onChoose={() => chooseTopic(topic.id)}>{topic.name}</AutoCompleteMenuItem>)
  }

  return <AutoComplete
    placeholder='Add more topics'
    onChange={suggestTopics}
    renderItems={renderTopics}
    suggestions={suggestions}
    renderSuggestions={renderSuggestions}
    addNew={createNewTopic}
    tabIndex='3'
  />
}
