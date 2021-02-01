import React, { useState } from 'react'
import plus from '../../Images/plus.png'
import minus from '../../Images/minus.png'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { editInvoice } from '../../Redux/action/invoice'

const QtyBelanja = props => {
    const { max, index } = props

    const handleChange = async (e = null, operator) => {
        const list = [...props.invoice.data]

        if (operator === "+" && props.qty < max) {
            list[index].qty++
            await props.dispatch(editInvoice(list))
        } else if (operator === "-" && props.qty == 1) {
            list.splice(index, 1)
            await props.dispatch(editInvoice(list))
        } else if (operator === "-" && props.qty > 0) {
            list[index].qty--
            await props.dispatch(editInvoice(list))
        }

        if (e) {
            const { value } = e.target
            if (!isNaN(value)) {
                if (parseInt(value) > parseInt(max)) {
                    list[index].qty = max
                    await props.dispatch(editInvoice(list))
                } else {
                    list[index].qty = value
                    await props.dispatch(editInvoice(list))
                }
            }

        }

    }

    return (
        <>
            <div className="flex flex-1">
                <button onClick={() => handleChange(null, "+")} className="focus:outline-none"> <img src={plus} className="w-8" /> </button>
                <input onChange={(e) => handleChange(e, null)} name="qty" value={props.qty} max={max} min={0} type="number" className="w-10 focus:outline-none mx-4" />
                <button onClick={() => handleChange(null, "-")} className="focus:outline-none"> <img src={minus} className="w-8" /> </button>
            </div>
            <span className="flex-1">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(props.harga * props.qty)}</span>
        </>
    )
}

QtyBelanja.propTypes = {
    max: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    harga: PropTypes.number.isRequired
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