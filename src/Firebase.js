import firebase from 'firebase/app'
import "firebase/firestore";
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
firebase.firestore().enablePersistence()
  .catch(function(err) {
      console.log(err)
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });
export default firebase;