const initialState = {
    data: [],
}

const distributor = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DISTRIBUTOR_FULFILLED':
            return {
                data: action.payload,
            }

        default:
            return state
    }
}

export default distributor