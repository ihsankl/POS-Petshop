import { combineReducers } from 'redux'
import checkConnection from './checkConnection'
import notification from './notification'
import dataBarang from './barang'
import invoice from './invoice'
import confirm from './confirm'
import penjualan from './penjualan'
import user from './user'

const appReducer = combineReducers({
    checkConnection,
    notification,
    dataBarang,
    invoice,
    confirm,
    penjualan,
    user
})


export default appReducer 