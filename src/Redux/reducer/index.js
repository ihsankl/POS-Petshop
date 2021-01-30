import { combineReducers } from 'redux'
import checkConnection from './checkConnection'
import notification from './notification'
import dataBarang from './barang'

const appReducer = combineReducers({
    checkConnection,
    notification,
    dataBarang
})


export default appReducer 