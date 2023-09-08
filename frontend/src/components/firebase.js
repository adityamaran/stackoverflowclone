// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvP5TnI6uDXT68w47ltXeYj_lFBahX2bs",
  authDomain: "stackoverflow-by-aditya.firebaseapp.com",
  projectId: "stackoverflow-by-aditya",
  storageBucket: "stackoverflow-by-aditya.appspot.com",
  messagingSenderId: "397971426701",
  appId: "1:397971426701:web:d224d3c7ec56c9522dc1c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();