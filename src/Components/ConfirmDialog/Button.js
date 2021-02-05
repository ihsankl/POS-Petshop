import React from 'react'
import PropTypes from 'prop-types'

const Button = props => {
    const { type = 'button', children, className = '', onClick } = props;
    return (
        <button
            className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

Button.propTypes = {

}

export default Button
