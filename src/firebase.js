import * as firebase from "firebase";

// credentiales of firebase SDK
const firebaseConfig = {
  apiKey: "AIzaSyAGFnwWmKVXWptycmXG9PpJ93xg9Z-5umM",
  authDomain: "examen-nodejs.firebaseapp.com",
  projectId: "examen-nodejs",
  storageBucket: "examen-nodejs.appspot.com",
  messagingSenderId: "168617113938",
  appId: "1:168617113938:web:5262dd5e7e8922a68e228b",
};

// initialize app with firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
