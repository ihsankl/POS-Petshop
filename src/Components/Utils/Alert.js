import React from 'react'
import { useSpring, animated } from 'react-spring'
import PropTypes from 'prop-types'
import { compose } from "redux";
import { connect } from 'react-redux';

const Alert = (props) => {
    const { msg,success, error } = props

    const fade = useSpring({
        opacity: success || error ? 1:0
    })
    return (
        <animated.div style={fade} className={`z-50 fixed right-0 top-20 left-0 overflow-hidden justify-center flex z-50`}>
            <div className={`${error ? 'border-red-500 border-2 text-red-500' : success ? 'border-blue-500 border-2 text-blue-500' : ''} w-1/2 py-4 flex justify-center items-center bg-white`}>{msg}</div>
        </animated.div>
    )
}

Alert.propTypes = {
    msg: PropTypes.string.isRequired,
}

const mapStateToProps = state => {
    return {
        notification: state.notification
    }
}


export default compose(
    connect(mapStateToProps),
)(Alert)
