import React from 'react'
import {useSpring, animated} from 'react-spring'
import PropTypes from 'prop-types'

const Disconnected = props => {
    const {disconnected} = props
    const fade = useSpring({
        opacity: !disconnected ? 0 : 1
    })
    return (
        <animated.div style={fade} className={`z-50 fixed right-0 top-20 left-0 overflow-hidden justify-center flex`}>
            <div className={`border-red-500 border-2 bg-white w-1/2 py-4 text-red-500 flex justify-center items-center`}>Koneksi Terputus!!</div>
        </animated.div>
    )
}

Disconnected.propTypes = {
    disconnected:PropTypes.bool.isRequired
}

export default Disconnected
