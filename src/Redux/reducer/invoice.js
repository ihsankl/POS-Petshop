const initialState = {
    data: [],
}

const invoice = (state = initialState, action) => {
    switch (action.type) {
        case 'EDIT_INVOICE_FULFILLED':
            return {
                data: action.payload,
            }

        default:
            return state
    }
}

export default invoice