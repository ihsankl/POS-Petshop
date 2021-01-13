const initialState = {
    isConnected: 'disconnected',
}

const checkConnection = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_STATUS_CONNECTION_FULFILLED':
            return {
                ...state,
                isConnected: action.payload,
            }

        default:
            return state
    }
}

export default checkConnection