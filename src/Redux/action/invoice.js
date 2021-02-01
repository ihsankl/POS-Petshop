export const editInvoice = (data) => {
    return {
        type: 'EDIT_INVOICE',
        payload: Promise.resolve(data)
    }
}