import firebase from '../../Firebase'
const kasirRef = firebase.firestore().collection("kasir")


export const login = (data) => {
    return {
        type: 'GET_TOKEN',
        payload: kasirRef.where('username', '==', data.username).where('pass', '==', data.pass).get()
    }
}

export const logOut = () => {
    return {
        type: 'REMOVE_TOKEN',
        payload: {}
    }
}
