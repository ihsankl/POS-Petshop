import { combineReducers } from 'redux'
import checkConnection from './checkConnection'
import notification from './notification'
import dataBarang from './barang'
import invoice from './invoice'

const appReducer = combineReducers({
    checkConnection,
    notification,
    dataBarang,
    invoice,
})


export default appReducer 