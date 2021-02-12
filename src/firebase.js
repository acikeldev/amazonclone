import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCacrPpyrakeOWbyiWrTvaybRHEYDhrCX8",
  authDomain: "challenge-e7536.firebaseapp.com",
  databaseURL: "https://challenge-e7536.firebaseio.com",
  projectId: "challenge-e7536",
  storageBucket: "challenge-e7536.appspot.com",
  messagingSenderId: "713449559462",
  appId: "1:713449559462:web:413d32704653da082bab67",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
