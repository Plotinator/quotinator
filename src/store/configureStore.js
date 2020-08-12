import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
// import saver from '../middlewares/saver'
// import tracker from '../middlewares/tracker'
// import logger from '../middlewares/logger'

// const store = createStore(rootReducer, initialState, applyMiddleware(saver, logger))
const store = createStore(rootReducer, {})
export default store
