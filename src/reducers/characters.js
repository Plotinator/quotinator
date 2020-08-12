import { } from '../constants/ActionTypes'
import { initialCharacter, newFileState } from '../store/initialState'

export default function characters (state = newFileState, action) {
  switch (action.type) {

    default:
      return state || newFileState
  }
}