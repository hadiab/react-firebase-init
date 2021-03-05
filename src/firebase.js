import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyBIletBAYzrKp5q439CfX62CqcapdyNAuA",
    authDomain: "react-fire-test-b4f99.firebaseapp.com",
    projectId: "react-fire-test-b4f99",
    storageBucket: "react-fire-test-b4f99.appspot.com",
    messagingSenderId: "170446131450",
    appId: "1:170446131450:web:d0b6e3cd759667a858b943"
};

const app = firebase.initializeApp(firebaseConfig);

export const firebaseDB = app.firestore()
export const firebaseStorage = app.storage().ref()
export const timestamp = firebase.firestore.FieldValue.serverTimestamp