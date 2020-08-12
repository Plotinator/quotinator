import { } from '../constants/ActionTypes'
import { initialEvent, newFileState } from '../store/initialState'

export default function events (state = newFileState, action) {
  switch (action.type) {

    default:
      return state || newFileState
  }
}