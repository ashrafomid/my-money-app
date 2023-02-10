// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeTyifaUGwzO0KjziyE2bZh5weOi8C4lI",
  authDomain: "my-money-d52ab.firebaseapp.com",
  projectId: "my-money-d52ab",
  storageBucket: "my-money-d52ab.appspot.com",
  messagingSenderId: "202167726427",
  appId: "1:202167726427:web:8951f5145f9e1269b26a7e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestoreDatabase = getFirestore();
const firebaseAuth = getAuth(app);
export { firestoreDatabase, firebaseAuth };
