const initialState = {
    connectionStatus: '',
}

const checkConnection = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_STATUS_CONNECTION_FULFILLED':
            return {
                connectionStatus: action.payload,
            }

        default:
            return state
    }
}

export default checkConnection