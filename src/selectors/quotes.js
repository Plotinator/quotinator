import { createSelector } from 'reselect'
import { uniq, groupBy } from 'lodash'

const selectAllQuotes = data => data
const topicIdsSelector = (data, ids) => ids

export const quotesByTopicIdSelector = createSelector(
  selectAllQuotes,
  (quotes) => {
    console.log('quotesByTopicIdSelector')
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

export const quotesFilteredByTopicSelector = createSelector(
  selectAllQuotes,
  quotesByTopicIdSelector,
  topicIdsSelector,
  (allQuotes, quotesByTopic, topicIds) => {
    console.log('topicIds', quotesByTopic, topicIds)
    if (!topicIds.length) return allQuotes

    return topicIds.reduce((acc, id) => {
      if (quotesByTopic[id]) {
        acc.push(...quotesByTopic[id])
      }
      return acc
    }, [])
  }
)