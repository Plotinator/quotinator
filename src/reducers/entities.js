import { combineReducers } from 'redux'
import authors from './authors'
import books from './books'
import characters from './characters'
import events from './events'
import quotes from './quotes'
import series from './series'
import speeches from './speeches'
import topics from './topics'

const entities = combineReducers({
  authors,
  books,
  characters,
  events,
  quotes,
  series,
  speeches,
  topics
})

export default entities