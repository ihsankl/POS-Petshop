import React from 'react'
import {useSpring, animated} from 'react-spring'
import PropTypes from 'prop-types'

const Disconnected = () => {
    const {disconnected} = props
    const fade = useSpring({
        opacity: !disconnected ? 0 : 1
    })
    return (
        <animated.div style={fade} className={`z-50 absolute right-0 top-0 left-0 overflow-hidden justify-center flex`}>
            <div className={`border-blue-500 border-2 w-1/2 py-4 text-red-500 flex justify-center items-center`}>Koneksi Terputus!!</div>
        </animated.div>
    )
}

Loading.propTypes = {
    disconnected:PropTypes.bool.isRequired
}

export default Disconnected
