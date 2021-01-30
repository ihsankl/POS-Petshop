const initialState = {
    barang: {},
}

const dataBarang = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BARANG_FULFILLED':
            return {
                barang: action.payload,
            }

        default:
            return state
    }
}

export default dataBarang