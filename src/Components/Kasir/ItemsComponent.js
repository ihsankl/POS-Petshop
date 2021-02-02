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
            <div className="self-end flex">
                {/* <button onClick={() => toggleItem(btnRef.current)} className="relative focus:outline-none">
                    <svg width="6" height="20" viewBox="0 0 6 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M3 5C4.375 5 5.5 3.875 5.5 2.5C5.5 1.125 4.375 0 3 0C1.625 0 0.5 1.125 0.5 2.5C0.5 3.875 1.625 5 3 5ZM3 7.5C1.625 7.5 0.5 8.625 0.5 10C0.5 11.375 1.625 12.5 3 12.5C4.375 12.5 5.5 11.375 5.5 10C5.5 8.625 4.375 7.5 3 7.5ZM0.5 17.5C0.5 16.125 1.625 15 3 15C4.375 15 5.5 16.125 5.5 17.5C5.5 18.875 4.375 20 3 20C1.625 20 0.5 18.875 0.5 17.5Z" fill="#7579E7" />
                    </svg>
                </button> */}
            </div>
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
        dataBarang: state.dataBarang,
        invoice: state.invoice,
    }
}


export default compose(
    connect(mapStateToProps),
)(ItemsComponent)