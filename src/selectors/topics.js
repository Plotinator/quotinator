export function selectTopicIds (state) {
  return state.entities.topics.allIds
}

export function selectAllTopics (state) {
  return state.entities.topics.byId
}