// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkd8fh-FvmSYmfw6lUZzs8wJNxFLfae60",
  authDomain: "currante-cc67d.firebaseapp.com",
  projectId: "currante-cc67d",
  storageBucket: "currante-cc67d.appspot.com",
  messagingSenderId: "600804388088",
  appId: "1:600804388088:web:462bb6fe80c75f3d1d9f0d",
  measurementId: "G-QT2ND7H13Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
