import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import QtyBelanja from '../../Components/Kasir/QtyBelanja'

const List = (props) => {
    const { items } = props

    const Detail = ({ data, index }) => (
        <div className="flex text-purple-500 font-bold text-xl items-center">
            <span className="flex-1">{data.nama_barang}</span>
            <QtyBelanja
                qty={parseInt(data.qty)}
                max={parseInt(data.sisa_stok)}
                harga={parseInt(data.harga_jual)}
                index={index}
            />
        </div>
    )

    return (
        <>
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
        </>
    )
}

List.propTypes = {
    items: PropTypes.array.isRequired,
}


const mapStateToProps = state => {
    return {
        connection: state.checkConnection,
        notification: state.notification
    }
}


export default compose(
    connect(mapStateToProps),
)(List)