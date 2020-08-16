import { IoIosStarOutline } from 'react-icons/io'
import { useCollection } from '@nandorojo/swr-firestore'
import hardCodedUserId from '../../store/hardCodedUserId'
import { topicsByIdSelector } from '../../selectors/topics'
import { authorsByIdSelector } from '../../selectors/authors'
import { Column } from '../spectre/Grid'
import TopicChip from '../topics/TopicChip'
import { Modal } from '../spectre/Modal'
import { useState } from 'react'
import CardModal from './CardModal'

export default function Card (props) {
  const [open, setOpen] = useState(false)
  const { data: topics } = useCollection('topics', {where: ['userId', '==', hardCodedUserId]})
  const { data: authors } = useCollection('authors', {where: ['userId', '==', hardCodedUserId]})
  const quote = props.quote

  // TODO: handle pressing esc to close modal
  // TODO: probably move modal to <Main/> once I add Recoil so it can be a global thing

  const renderTopics = () => {
    if (topics && quote.topicIds?.length) {
      const topicsById = topicsByIdSelector(topics)
      return quote.topicIds.map(id => <TopicChip key={id} topic={topicsById[id]} />)
    } else return null
  }

  const renderAuthor = () => {
    if (authors && quote.authorId) {
      const authorsById = authorsByIdSelector(authors)
      return <div className='quote-author'>{'—'}{authorsById[quote.authorId].name}</div>
    } else return null
  }

  return <Column size={3} className='col-md-6 col-xs-12'>
    <CardModal open={open} quote={quote} onClose={() => setOpen(false)}/>
    <div className='card' onClick={() => setOpen(true)}>
      <div className='card-body'>
        <IoIosStarOutline className='favorite-star'/>
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