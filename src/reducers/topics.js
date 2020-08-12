import { } from '../constants/ActionTypes'
import { initialTopic, newFileState } from '../store/initialState'

export default function topics (state = newFileState, action) {
  switch (action.type) {

    default:
      return state || newFileState
  }
}