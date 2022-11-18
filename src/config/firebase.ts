// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import{ getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxpDnnNvRUC_HahPBDhCOlHh_MO7MubP8",
  authDomain: "sharenotes-34ff5.firebaseapp.com",
  projectId: "sharenotes-34ff5",
  storageBucket: "sharenotes-34ff5.appspot.com",
  messagingSenderId: "525457123437",
  appId: "1:525457123437:web:bdf065274e66a690ee7764",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 1. 驗證
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app); //tell the app to use firestore