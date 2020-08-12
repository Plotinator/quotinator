import { } from '../constants/ActionTypes'
import { initialSerie, newFileState } from '../store/initialState'

export default function series (state = newFileState, action) {
  switch (action.type) {

    default:
      return state || newFileState
  }
}