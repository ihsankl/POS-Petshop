export const confirm = (data) => {
    return {
        type: 'CONFIRM',
        payload: Promise.resolve(data)
    }
}