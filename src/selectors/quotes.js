import { createSelector } from 'reselect'
import { groupBy } from 'lodash'
import * as filterFunctions from '../utils/filters'

const selectAllQuotes = data => data
const topicIdsSelector = (data, ids) => ids
const filterSelector = (data, ids, filter) => filter

export const quotesByTopicIdSelector = createSelector(
  selectAllQuotes,
  (quotes) => {
    return quotes.reduce((acc, quote) => {
      quote.topicIds.forEach(id => {
        if (acc[id]) {
          // check that it's not already in there
          if (!acc[id].some(q => q.id == quote.id)) {
            acc[id] = [...acc[id], quote]
          }
        } else {
          acc[id] = [quote]
        }
      })
      return acc
    }, {})
  }
)

export const quotesByAuthorIdSelector = createSelector(
  selectAllQuotes,
  (quotes) => groupBy(quotes, 'authorId')
)

export const quotesByWorkIdSelector = createSelector(
  selectAllQuotes,
  (quotes) => groupBy(quotes, 'workId')
)

export const filteredQuotesSelector = createSelector(
  selectAllQuotes,
  quotesByTopicIdSelector,
  topicIdsSelector,
  filterSelector,
  (allQuotes, quotesByTopic, topicIds, filter) => {
    if (topicIds.length) {
      const quoteObj = topicIds.reduce((acc, id) => {
        if (quotesByTopic[id]) {
          const visibleQuotes = quotesByTopic[id].filter(filterFunc(filter))
          // ensure no duplicates
          visibleQuotes.forEach(vQ => acc[vQ.id] = vQ)
        }
        return acc
      }, {})
      return Object.values(quoteObj)
    } else {
      return allQuotes.filter(filterFunc(filter))
    }
  }
)

const filterFunc = (filter) => (quote) => filterFunctions[filter](quote)
