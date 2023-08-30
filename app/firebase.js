// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCx1PJXDuYMaiwdXIChYjrg3BqoSGhJHdA",
  authDomain: "expense-tracker-9fe49.firebaseapp.com",
  projectId: "expense-tracker-9fe49",
  storageBucket: "expense-tracker-9fe49.appspot.com",
  messagingSenderId: "813618775061",
  appId: "1:813618775061:web:416c930767ac4bc9f73a1c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);