import { combineReducers } from 'redux'
import login from './login'
import checkConnection from './checkConnection'

const appReducer = combineReducers({
    login,
    checkConnection,
})


export default appReducer 