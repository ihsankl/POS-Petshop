import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '../ConfirmDialog/IconButton'
import ExitIcon from '../ConfirmDialog/ExitIcon'

const Dialog = props => {
    const { open, onClose } = props;
    if (!open) {
        return <></>;
    }

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
            <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg border-2 border-black">
                <div>{props.children}</div>
                <span className="absolute top-0 right-0 p-4">
                    <IconButton onClick={onClose}>
                        <ExitIcon />
                    </IconButton>
                </span>
            </div>
        </div>
    )
}

Dialog.propTypes = {

}

export default Dialog
