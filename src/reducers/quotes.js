import { } from '../constants/ActionTypes'
import { initialQuote, newFileState } from '../store/initialState'

export default function quotes (state = newFileState, action) {
  switch (action.type) {

    default:
      return state || newFileState
  }
}