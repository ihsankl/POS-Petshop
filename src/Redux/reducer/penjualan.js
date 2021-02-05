const initialState = {
    dataPenjualan: [],
}

const dataPenjualan = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PENJUALAN_FULFILLED':
            return {
                dataPenjualan: action.payload,
            }

        default:
            return state
    }
}

export default dataPenjualan