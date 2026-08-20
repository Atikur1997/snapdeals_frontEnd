// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg43GAEcm4Gsob-uI63DtNywmPlR8KoWY",
  authDomain: "snapdeals-d9a4f.firebaseapp.com",
  projectId: "snapdeals-d9a4f",
  storageBucket: "snapdeals-d9a4f.firebasestorage.app",
  messagingSenderId: "493173897628",
  appId: "1:493173897628:web:2b9ddd2489f1069550f059",
  measurementId: "G-GKLF7EK2T5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
