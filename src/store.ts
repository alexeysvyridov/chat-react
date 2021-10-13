import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './rootReducer'
import {loadStorage, saveToStorage} from './localStorage'
let persistedState = loadStorage()

export const store = createStore(rootReducer, persistedState, applyMiddleware(thunk))

// store.subscribe(() => {
//     console.log(store.getState())
//     saveToStorage(store.getState().loginReducer.user)
// })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;