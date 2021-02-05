import React from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'

const MultiTab = props => {
    const { isMultiTab } = props
    const fade = useSpring({
        opacity: !isMultiTab ? 0 : 1
    })
    return (
        <animated.div style={fade} className={`z-50 absolute right-0 top-0 left-0 overflow-hidden justify-center flex`}>
            <div className={`bg-white border-red-500 border-2 w-1/2 py-4 text-red-500 flex justify-center items-center`}>Silahkan kembali Ke Tab Sebelum nya!</div>
        </animated.div>
    )
}

MultiTab.propTypes = {
    isMultiTab: PropTypes.bool.isRequired
}

export default MultiTab
