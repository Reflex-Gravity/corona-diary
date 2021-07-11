/* eslint-disable @typescript-eslint/no-explicit-any */
// import * as reduxModule from "redux"
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer'
import throttle from "lodash.throttle"
import { getStorageData, setStorageData } from 'main/utils/storage.handler'

// eslint-disable-next-line prettier/prettier
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistedStateSerialized = getStorageData("localStorage", "state")
let persistedState = undefined
try {
    persistedState = JSON.parse(persistedStateSerialized)
} catch (er) {
    persistedState=undefined
}

const store = createStore(rootReducer, persistedState, composeEnhancers(applyMiddleware(thunk)))

store.subscribe(throttle(() => {
    const { meetings, groups, emailId } = store.getState()
    setStorageData("localStorage","state",{ meetings, groups, emailId })
},1000))

export default store
