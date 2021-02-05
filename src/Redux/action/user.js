export const getUser = (data) => {
    return {
        type: 'GET_USER',
        payload: Promise.resolve(data)
    }
}