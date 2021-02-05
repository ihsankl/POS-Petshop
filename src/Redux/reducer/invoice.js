const initialState = {
    data: [],
    sum: 0
}

const invoice = (state = initialState, action) => {
    switch (action.type) {
        case 'EDIT_INVOICE_FULFILLED':
            return {
                ...state,
                data: action.payload,
            }
            
        case 'SUM_INVOICE_FULFILLED':
            return {
                ...state,
                sum: action.payload,
            }
        default:
            return state
    }
}

export default invoice