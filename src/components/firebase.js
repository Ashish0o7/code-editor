// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjZL5xO-3zIfSVfgKQeYPzFE54radQraA",
  authDomain: "code-editor-9b25e.firebaseapp.com",
  projectId: "code-editor-9b25e",
  storageBucket: "code-editor-9b25e.appspot.com",
  messagingSenderId: "411595774832",
  appId: "1:411595774832:web:fa617c4a3fa63db0534db5",
  measurementId: "G-GTBQDQYY14"
};

// Initialize Firebase

const analytics = getAnalytics(app);

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

export { app, auth, db };