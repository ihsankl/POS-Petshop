import React from 'react'
import {useSpring, animated} from 'react-spring'
import PropTypes from 'prop-types'

const Alert = (props) => {
    const {error, success, msg} = props
    const fade = useSpring({
        opacity: !error && !success ? 0 : 1
    })
    return (
        <animated.div style={fade} className={`z-50 absolute right-0 top-0 left-0 overflow-hidden justify-center flex`}>
            <div className={`${error ? 'border-red-500 border-2': success ? 'border-blue-500 border-2':''} w-1/2 py-4 text-red-500 flex justify-center items-center`}>{msg}</div>
        </animated.div>
    )
}

Alert.propTypes = {
    error:PropTypes.bool,
    success:PropTypes.bool,
    msg:PropTypes.string.isRequired,
}

export default Alert
