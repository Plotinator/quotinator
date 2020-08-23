import { useState } from 'react'
import cx from 'classnames'
import { IoIosStarOutline, IoIosStar } from 'react-icons/io'
import { Column } from '../spectre/Grid'
import TopicChip from '../topics/TopicChip'
import EditQuoteModal from '../quotes/EditQuoteModal'
import { update } from '@nandorojo/swr-firestore'
import { useAuthor } from '../../hooks/authors'
import { useTopicsById } from '../../hooks/topics'
import { useWork } from '../../hooks/works'
import { useCharacter } from '../../hooks/characters'

export default function Card (props) {
  const quote = props.quote
  const [open, setOpen] = useState(false)
  const topicsById = useTopicsById()
  const author = useAuthor(quote.authorId)
  const work = useWork(quote.workId)
  const character = useCharacter(quote.characterId)

  // TODO: handle pressing esc to close modal
  // TODO: probably move modal to <Main/> once I add Recoil so it can be a global thing

  const toggleFavorite = e => {
    e.stopPropagation()
    update(`quotes/${quote.id}`, {favorite: !quote.favorite})
  }

  const renderStar = () => {
    if (quote.favorite) {
      return <IoIosStar className='favorite-star favorited' onClick={toggleFavorite}/>
    } else {
      return <IoIosStarOutline className='favorite-star' onClick={toggleFavorite}/>
    }
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

  const renderWork = () => {
    if (work) {
      return <div className='quote-author'>in <i>{work.name}</i></div>
    } else return null
  }

  const renderCharacter = () => {
    if (character) {
      return <div className='quote-author'>by {character.name}</div>
    } else return null
  }

  return <Column size={3} className='col-lg-4 col-sm-6 col-xs-12'>
    {open ? <EditQuoteModal open={open} quote={quote} onClose={() => setOpen(false)}/> : null}
    <div className='card' onClick={() => setOpen(true)}>
      <div className='card-body'>
        { renderStar() }
        <q className='quote-text'>{quote.text}</q>
      </div>
      <div className='card-footer'>
        { renderAuthor() }
        { renderCharacter() }
        { renderWork() }
        <div className='topic-chips-wrapper'>
          { renderTopics() }
        </div>
      </div>
    </div>
  </Column>
}