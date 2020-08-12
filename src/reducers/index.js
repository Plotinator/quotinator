import { combineReducers } from 'redux'
import ui from './ui'
import file from './file'
import entities from './entities'

const rootReducer = combineReducers({
  ui,
  file,
  entities
})

export default rootReducer
