import { useState } from 'react'
import { IoIosStarOutline } from 'react-icons/io'
import { Column } from '../spectre/Grid'
import TopicChip from '../topics/TopicChip'
import CardModal from './CardModal'
import { useAuthor } from '../../hooks/authors'
import { useTopicsById } from '../../hooks/topics'

export default function Card (props) {
  const quote = props.quote
  const [open, setOpen] = useState(false)
  const topicsById = useTopicsById()
  const author = useAuthor(quote.authorId)

  // TODO: handle pressing esc to close modal
  // TODO: probably move modal to <Main/> once I add Recoil so it can be a global thing

  const toggleFavorite = e => {
    e.stopPropagation()


  }

  const renderTopics = () => {
    if (topicsById && quote.topicIds?.length) {
      return quote.topicIds.map(id => <TopicChip key={id} topic={topicsById[id]} />)
    } else return null
  }

  const renderAuthor = () => {
    if (author) {
      return <div className='quote-author'>{'—'}{author.name}</div>
    } else return null
  }

  return <Column size={3} className='col-md-6 col-xs-12'>
    <CardModal open={open} quote={quote} onClose={() => setOpen(false)}/>
    <div className='card' onClick={() => setOpen(true)}>
      <div className='card-body'>
        <IoIosStarOutline className='favorite-star' onClick={toggleFavorite}/>
        <q className='quote-text'>{quote.text}</q>
      </div>
      <div className='card-footer'>
        { renderAuthor() }
        <div className='topic-chips-wrapper'>
          { renderTopics() }
        </div>
      </div>
    </div>
  </Column>
}