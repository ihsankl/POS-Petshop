const initialState = {
    userData: [],
    isSigned: false
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER_FULFILLED':
            return {
                userData: action.payload.data,
                isSigned: action.payload.isSigned
            }

        default:
            return state
    }
}

export default user