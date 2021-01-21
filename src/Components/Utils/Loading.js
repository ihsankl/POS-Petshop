import React from 'react'
import {useSpring, animated} from 'react-spring'
import PropTypes from 'prop-types'

const Loading = (props) => {
    const {loading} = props
    const fade = useSpring({
        opacity: !loading ? 0 : 1
    })
    return (
        <animated.div style={fade} className={`z-50 absolute right-0 top-0 left-0 overflow-hidden justify-center flex`}>
            <div className={`bg-white border-blue-500 border-2 w-1/2 py-4 text-red-500 flex justify-center items-center`}>Mohon Tunggu . . .</div>
        </animated.div>
    )
}

Loading.propTypes = {
    loading:PropTypes.bool.isRequired
}

export default Loading