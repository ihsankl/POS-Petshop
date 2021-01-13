import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDTENRHgfaFkPix45-hyPOavx1iJePPibs",
    authDomain: "pos-petshop.firebaseapp.com",
    projectId: "pos-petshop",
    storageBucket: "pos-petshop.appspot.com",
    messagingSenderId: "722476299114",
    appId: "1:722476299114:web:4171a4c0d2d585acfcab13",
    measurementId: "G-JD7P4VF75T"
};


firebase.initializeApp(firebaseConfig);

export default firebase;