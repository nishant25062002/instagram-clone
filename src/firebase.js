import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBe7hoEdDU-ZgSCXpR4vTE2DEoYpLLA0OY",
    authDomain: "instagr-clone.firebaseapp.com",
    projectId: "instagr-clone",
    storageBucket: "instagr-clone.appspot.com",
    messagingSenderId: "60268407563",
    appId: "1:60268407563:web:ec15e749f143f34e66500e"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };