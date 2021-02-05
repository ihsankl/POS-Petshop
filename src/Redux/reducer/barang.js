const initialState = {
    data: [],
}

const barang = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BARANG_FULFILLED':
            return {
                data: action.payload,
            }

        default:
            return state
    }
}

export default barang