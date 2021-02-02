import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { sumInvoice } from '../../Redux/action/invoice'
import PropTypes from 'prop-types'
import QtyBelanja from './QtyBelanja'

const List = (props) => {
    const { items } = props

    useEffect(() => {
        count()
        return () => {

        }
    }, [items])

    const count = async (index) => {
        const total = props.invoice.data.reduce((acc, el) => acc + (parseInt(el.isDistributor ? el.harga_distributor : el.harga_jual) * parseInt(el.qty)), 0)
        await props.dispatch(sumInvoice(total))
    }

    const Detail = ({ data, index }) => {
        // TODO: choose between harga_jual, harga_pokok, harga_distributor
        const harga = data.harga_jual

        const finalCost = parseInt(harga) - (parseInt(harga) * ((parseInt(data.diskon) / 100)))
        return (
            <div className="flex text-purple-500 font-bold text-xl items-center pb-4">

                <QtyBelanja
                    data={data}
                    index={index}
                />
            </div>)
    }

    return (
        <div className=" mt-8">
            {items.length > 0 &&
                items.map((data, index) => (
                    <Detail
                        key={index}
                        data={data}
                        index={index}
                    />
                ))
            }
        </div>
    )
}

List.propTypes = {
    items: PropTypes.array.isRequired,
}

const mapStateToProps = state => {
    return {
        connection: state.checkConnection,
        notification: state.notification,
        invoice: state.invoice
    }
}

export default compose(
    connect(mapStateToProps),
)(List)