export const editInvoice = (data) => {
    return {
        type: 'EDIT_INVOICE',
        payload: Promise.resolve(data)
    }
}

export const sumInvoice = (sum) => {
    return {
        type: 'SUM_INVOICE',
        payload: Promise.resolve(sum)
    }
}