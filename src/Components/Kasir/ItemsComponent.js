import React, { useRef, useState } from 'react'
import _ from 'underscore'
import { editInvoice } from '../../Redux/action/invoice'
import { compose } from 'redux'
import { connect } from 'react-redux'

const ItemsComponent = (props) => {

    const pushToInvoice = async (data) => {
        const list = [...props.invoice.data]

        // check if data is exist 
        const isExist = _.findWhere(list, { nama_barang: data.nama_barang })
        if (!isExist) { // if data is not exist, add new item
            if (data.sisa_stok > 0) {
                const toProcess = {
                    ...data,
                    qty: 1,
                    isDistributor:false,
                }
                list.push(toProcess)
                // to redux
                await props.dispatch(editInvoice(list))
            }
        } else {
            const index = _.indexOf(list, isExist)
            if (list[index].qty < data.sisa_stok) {
                list[index].qty++
                await props.dispatch(editInvoice(list))
            }
        }
    }

    return (
        <button onClick={() => pushToInvoice(props.data)} className="mr-4 mb-4 rounded-md border-2 border-purple-500 w-44 bg-white flex flex-col p-2">
            <div className="w-full h-24 flex justify-center items-center">
                {/* TODO: SHOW IMAGE */}
                <span className="">IMAGE HERE</span>
            </div>
            <div className="flex flex-col text-sm text-purple-500 justify-start">
                <span className="py-1 font-bold">{props.data.nama_barang}</span>
                <span className="py-1">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(props.data.harga_jual)}</span>
                <span className="py-1">Stok Tersisa {props.data.sisa_stok}</span>
            </div>
        </button>
    )
}

const mapStateToProps = state => {
    return {
        connection: state.checkConnection,
        notification: state.notification,
        barang: state.barang,
        invoice: state.invoice,
    }
}


export default compose(
    connect(mapStateToProps),
)(ItemsComponent)