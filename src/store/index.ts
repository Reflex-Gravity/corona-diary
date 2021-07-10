/* eslint-disable @typescript-eslint/no-explicit-any */
// import * as reduxModule from "redux"
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer'

// eslint-disable-next-line prettier/prettier
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, undefined, composeEnhancers(applyMiddleware(thunk)))

export default store
