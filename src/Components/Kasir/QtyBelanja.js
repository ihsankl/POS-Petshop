import React, { useEffect, useState } from 'react'
import plus from '../../Assets/plus.png'
import minus from '../../Assets/minus.png'
import trash2 from '../../Assets/trash2.png'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { editInvoice } from '../../Redux/action/invoice'

const QtyBelanja = props => {
    const { index, data } = props
    const harga = props.invoice.data[index].isDistributor ? parseInt(data.harga_distributor) : parseInt(data.harga_jual)
    const finalCost = parseInt(harga) - (parseInt(harga) * (parseInt(data.diskon) / 100))

    useEffect(() => {
        return () => {

        }
    }, [])

    const handleChange = async (e = null, operator) => {
        const list = [...props.invoice.data]

        if (operator === "+" && data.qty < data.sisa_stok) {
            list[index].qty++
            await props.dispatch(editInvoice(list))
        } else if (operator === "-" && data.qty == 1) {
            list.splice(index, 1)
            await props.dispatch(editInvoice(list))
        } else if (operator === "-" && data.qty > 0) {
            list[index].qty--
            await props.dispatch(editInvoice(list))
        }

        if (e) {
            const { value } = e.target
            if (!isNaN(value)) {
                if (parseInt(value) > parseInt(data.sisa_stok)) {
                    list[index].qty = data.sisa_stok
                    await props.dispatch(editInvoice(list))
                } else {
                    if (value <= 0) {
                        list.splice(index, 1)
                        await props.dispatch(editInvoice(list))
                    } else {
                        list[index].qty = value
                        await props.dispatch(editInvoice(list))
                    }
                }
            }

        }


    }

    const deleteItemInvoice = async () => {
        const list = [...props.invoice.data]

        list.splice(index, 1)
        await props.dispatch(editInvoice(list))
    }

    const toggleIsDistributor = async () => {
        const IsDistributor = props.invoice.data[index].isDistributor
        const list = [...props.invoice.data]

        list[index].isDistributor = !IsDistributor
        await props.dispatch(editInvoice(list))
    }

    return (
        <>
            <button onClick={toggleIsDistributor} className={`focus:outline-none rounded-full w-8 h-8 font-bold border-4 border-purple-500 mr-2 text-base ${props.invoice.data[index].isDistributor ? 'bg-purple-500' : ''}`}>D</button>
            <span className="flex-1">{data.nama_barang}</span>
            <div className="flex flex-1">
                <button onClick={() => handleChange(null, "+")} className="focus:outline-none"> <img src={plus} className="w-8" /> </button>
                <input onChange={(e) => handleChange(e, null)} name="qty" value={data.qty} max={data.sisa_stok} min={0} type="number" className="w-12 focus:outline-none border-2 border-purple-500 rounded-md px-1 mx-4" />
                <button onClick={() => handleChange(null, "-")} className="focus:outline-none"> <img src={minus} className="w-8" /> </button>
            </div>
            <span className="flex-1">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(parseInt(finalCost) * parseInt(data.qty))}</span>
            <button onClick={deleteItemInvoice} className="focus:outline-none"><img src={trash2} className="w-6 " /></button>
        </>
    )
}

QtyBelanja.propTypes = {
    index: PropTypes.number.isRequired,
}


const mapStateToProps = state => {
    return {
        connection: state.checkConnection,
        notification: state.notification,
        invoice: state.invoice,
    }
}


export default compose(
    connect(mapStateToProps),
)(QtyBelanja)