import { combineReducers } from 'redux'
import checkConnection from './checkConnection'
import notification from './notification'

const appReducer = combineReducers({
    checkConnection,
    notification: notification
})


export default appReducer 