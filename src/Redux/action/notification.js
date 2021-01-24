export const notification = (data) => {
    return {
        type: 'GET_NOTIFICATION',
        payload: Promise.resolve(data)
    }
}