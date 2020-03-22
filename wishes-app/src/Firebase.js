import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDJU18imUNBGhHMLRHeD969Us8983XZJec",
    authDomain: "wishes-app-b3717.firebaseapp.com",
    databaseURL: "https://wishes-app-b3717.firebaseio.com",
    projectId: "wishes-app-b3717",
    storageBucket: "wishes-app-b3717.appspot.com",
    messagingSenderId: "737134191211",
    appId: "1:737134191211:web:0704ed217b8cc845d3c72e",
    measurementId: "G-EPQDEQ6J7Q"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
//   firebase.analytics();

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;