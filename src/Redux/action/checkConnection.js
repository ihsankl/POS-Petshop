export const checkConnection = (status) => {
    return {
        type: 'GET_STATUS_CONNECTION',
        payload: Promise.resolve(status)
    }
}