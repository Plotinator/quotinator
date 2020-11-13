import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { openedQuoteModal } from '../../recoil/atoms'
import cx from 'classnames'
import { IoIosStarOutline, IoIosStar } from 'react-icons/io'
import { Column } from '../spectre/Grid'
import TopicChip from '../topics/TopicChip'
import EditQuoteModal from './EditQuoteModal'
import { update } from '@nandorojo/swr-firestore'
import { useAuthor } from '../../hooks/authors'
import { useTopicsById } from '../../hooks/topics'
import { useWork } from '../../hooks/works'
import { useCharacter } from '../../hooks/characters'
import { Card, CardBody, CardFooter } from '../cards/Card'
import TopicChipsList from '../topics/TopicChipsList'

export default function Quote (props) {
  const quote = props.quote
  const [openedQuote, setOpenedQuote] = useRecoilState(openedQuoteModal)
  const author = useAuthor(quote.authorId)
  const work = useWork(quote.workId)
  const character = useCharacter(quote.characterId)

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

      // { renderCharacter() }
      // { renderWork() }
  return <Card onClick={() => setOpenedQuote(quote.id)}>
    <CardBody>
      { renderStar() }
      <q>{quote.text}</q>
    </CardBody>
    <CardFooter>
      { renderAuthor() }
      <TopicChipsList topicIds={quote.topicIds} />
    </CardFooter>
  </Card>
}