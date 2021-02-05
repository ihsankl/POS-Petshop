export const getPenjualan = (data) => {
    return {
        type: 'GET_PENJUALAN',
        payload: Promise.resolve(data)
    }
}