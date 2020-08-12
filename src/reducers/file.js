import { } from '../constants/ActionTypes'
import { initialFile } from '../store/initialState'

export default function file (state = initialFile, action) {
  switch (action.type) {

    default:
      return Object.assign({}, state, {dirty: true})
  }
}
