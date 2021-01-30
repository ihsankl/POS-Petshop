import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import QtyBelanja from '../../Components/Kasir/QtyBelanja'

const List = (props) => {
    const { items } = props
    return (
        <>
            <div className=" mt-8">
                {items.length > 0 &&
                    items.map((v, i) => (
                        <div className="flex text-purple-500 font-bold text-xl justify-between items-center">
                            <span>Saos ABC Maknyus</span>
                            <QtyBelanja max={10} />
                            <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(30000)}</span>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

List.propTypes = {
    items: PropTypes.number.isRequired,
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