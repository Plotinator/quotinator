import Chip from '../spectre/Chip'
import { useState } from 'react'

export default function TopicChip (props) {
  const [hovering, setHovering] = useState(false)
  const { topic } = props
  if (!topic) return null

  return <Chip
    style={{backgroundColor: topic.color}}
    className='topic-chip'
    closeButton={hovering}
    onMouseEnter={() => setHovering(true)}
    onMouseLeave={() => setHovering(false)}
    onRemove={props.onRemove}
  >
    { topic.name }
  </Chip>
}