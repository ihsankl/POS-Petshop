const initialState = {
    user:'',
    isLoading: false,
    isError: false,
    isSuccess: false,
}

const login = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TOKEN_PENDING':
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false
            }
        case 'GET_TOKEN_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true,
                isSuccess: false
            }
        case 'GET_TOKEN_FULFILLED':
            if (!action.payload.empty) {
                return {
                    // token: action.payload.data.token,
                    user: action.payload.docs[0].data(),
                    isLoading: false,
                    isError: false,
                    isSuccess: true
                }
            }
            return {
                isLoading: false,
                isError: true,
                isSuccess: false
            }
        case 'REMOVE_TOKEN_PENDING':
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false
            }
        case 'REMOVE_TOKEN_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true,
                isSuccess: false
            }
        case 'REMOVE_TOKEN_FULFILLED':
            return {
                isLoading: false,
                isError: false,
                isSuccess: true
            }
        default:
            return state
    }
}

export default login