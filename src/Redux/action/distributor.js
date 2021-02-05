export const getDistributor = (data) => {
    return {
        type: 'GET_DISTRIBUTOR',
        payload: Promise.resolve(data)
    }
}