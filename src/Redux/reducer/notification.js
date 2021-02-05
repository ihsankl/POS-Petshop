const initialState = {
    isSuccess: '',
    isError: '',
    msg: ''
}

const notification = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_NOTIFICATION_FULFILLED':
            return {
                ...initialState,
                isSuccess: action.payload.isSuccess,
                isError: action.payload.isError,
                msg: action.payload.msg
            }

        default:
            return state
    }
}

export default notification