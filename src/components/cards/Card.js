import { IoIosStarOutline } from 'react-icons/io'
import { useCollection } from '@nandorojo/swr-firestore'
import hardCodedUserId from '../../store/hardCodedUserId'
import { topicsByIdSelector } from '../../selectors/topics'
import { authorsByIdSelector } from '../../selectors/authors'
import { Column } from '../spectre/Grid'

export default function Card (props) {
  const quote = props.quote
  const { data: topics } = useCollection('topics', {where: ['userId', '==', hardCodedUserId]})
  const { data: authors } = useCollection('authors', {where: ['userId', '==', hardCodedUserId]})

  const renderTopics = () => {
    if (topics && quote.topicIds?.length) {
      const topicsById = topicsByIdSelector(topics)
      return quote.topicIds.map(id => <div key={id}>{topicsById[id].name}</div>)
    } else return null
  }

  const renderAuthor = () => {
    if (authors && quote.authorId) {
      const authorsById = authorsByIdSelector(authors)
      return <div>{'—'}{authorsById[quote.authorId].name}</div>
    } else return null
  }

  return <Column size={3} className='col-md-6 col-xs-12'>
    <div className='card'>
      <div className='card-body'>
        <IoIosStarOutline className='favorite-star'/>
        <p>&ldquo;{quote.text}&rdquo;</p>
      </div>
      <div className='card-footer'>
        { renderAuthor() }
        { renderTopics() }
      </div>
    </div>
  </Column>
}