import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button';
import Dialog from '../Utils/Dialog';

const ConfirmDialog = props => {
    const { open, onClose, title, children, onConfirm } = props
    return (
        <Dialog open={open} onClose={onClose}>
            <h2 className="text-xl">{title}</h2>
            <div className="py-5">{children}</div>
            <div className="flex justify-end">
                <div className="p-1">
                    <Button
                        onClick={() => onClose()}
                        className="bg-red-500 hover:bg-red-600"
                    >
                        <span>No</span>
                    </Button>
                </div>
                <div className="p-1">
                    <Button
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                    >
                        <span>Yes</span>
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}

ConfirmDialog.propTypes = {
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
}

export default ConfirmDialog
