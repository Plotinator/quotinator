import { } from '../constants/ActionTypes'
import { initialBook, newFileState } from '../store/initialState'

export default function books (state = newFileState, action) {
  switch (action.type) {

    default:
      return state || newFileState
  }
}