import { combineReducers } from 'redux'
import checkConnection from './checkConnection'
import notification from './notification'
import dataBarang from './barang'
import invoice from './invoice'
import confirm from './confirm'

const appReducer = combineReducers({
    checkConnection,
    notification,
    dataBarang,
    invoice,
    confirm,
})


export default appReducer 