import React from 'react'
import PropTypes from 'prop-types'

const IconButton = props => {
    const {
        children,
        className = '',
        onClick,
      } = props;
    return (
        <button
            onClick={onClick}
            className={`focus:outline-none focus:border-none hover:bg-gray-400 hover:bg-opacity-25 p-2 rounded-full inline-flex items-center ${className}`}
        >
            {children}
        </button>
    )
}

IconButton.propTypes = {

}

export default IconButton
