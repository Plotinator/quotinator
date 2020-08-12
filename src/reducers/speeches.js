import { } from '../constants/ActionTypes'
import { initialSpeech, newFileState } from '../store/initialState'

export default function speeches (state = newFileState, action) {
  switch (action.type) {

    default:
      return state || newFileState
  }
}