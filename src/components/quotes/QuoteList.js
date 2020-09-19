import React from 'react'
import { useRecoilState } from 'recoil'
import { openedQuoteModal } from '../../recoil/atoms'
import TopicChipsList from '../topics/TopicChipsList'
import { Row, Column } from '../spectre/Grid'

export default function QuoteList (props) {
  const [openedQuote, setOpenedQuote] = useRecoilState(openedQuoteModal)

  const renderQuotes = () => {
    if (!props.quotes) return null

    return props.quotes.map(q => {
      return <li key={q.id} onClick={() => setOpenedQuote(q.id)}>
        <Row gaps>
          <Column size={9}>
            <q>{q.text}</q>
          </Column>
          <Column size={3}>
            <TopicChipsList topicIds={q.topicIds}/>
          </Column>
        </Row>
      </li>
    })
  }

  return <div className='quote-list__wrapper'>
    <div className='quote-list__header'>
      <h3>Quotes</h3>
    </div>
    <ul className='quote-list'>
      { renderQuotes() }
    </ul>
  </div>
}