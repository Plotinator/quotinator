import { Column } from '../spectre/Grid'

export default function TopicsList (props) {
  const topics = props.data

  const renderTopics = () => {
    return topics.map(t => {
      return <div key={t.id} className='topic'>{t.name}</div>
    })
  }

  return <div className='topicsList'>
    { renderTopics() }
  </div>
}