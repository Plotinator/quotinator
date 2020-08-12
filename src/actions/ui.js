import { OPEN_CARD, SELECT_TOPIC, SELECT_CATEGORY } from '../constants/ActionTypes'

export function openCard (path) {
  return { type: OPEN_CARD, path }
}

export function selectTopic (topicId) {
  return { type: SELECT_TOPIC, topicId }
}

export function selectCategory (categoryId) {
  return { type: SELECT_CATEGORY, categoryId }
}

