import { combineReducers } from 'redux'
import checkConnection from './checkConnection'
import notification from './notification'
import barang from './barang'
import invoice from './invoice'
import confirm from './confirm'
import penjualan from './penjualan'
import user from './user'
import distributor from './distributor'

const appReducer = combineReducers({
    checkConnection,
    notification,
    barang,
    invoice,
    confirm,
    penjualan,
    distributor,
    user
})


export default appReducer 