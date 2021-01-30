export const getBarang = (data) => {
    return {
        type: 'GET_BARANG',
        payload: Promise.resolve(data)
    }
}