import { } from '../constants/ActionTypes'
import { initialAuthor, newFileState } from '../store/initialState'

export default function authors (state = newFileState, action) {
  switch (action.type) {

    default:
      return state || newFileState
  }
}