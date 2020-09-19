import React from 'react'
import { useTopicsById } from '../../hooks/topics'
import TopicChip from './TopicChip'

export default function TopicChipsList (props) {
  const { topicIds } = props
  const topicsById = useTopicsById()

  const renderTopics = () => {
    if (topicsById && topicIds?.length) {
      return topicIds.map(id => <TopicChip key={id} topic={topicsById[id]} />)
    } else return null
  }

  return <div className='topic-chips-wrapper'>
    { renderTopics() }
  </div>
}