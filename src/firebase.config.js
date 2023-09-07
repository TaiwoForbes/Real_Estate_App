// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCd_Ud73B83eUpyJLUQbMJ5kcqFqjxVIaU",
  authDomain: "real-estate-app-933e5.firebaseapp.com",
  projectId: "real-estate-app-933e5",
  storageBucket: "real-estate-app-933e5.appspot.com",
  messagingSenderId: "1092453591973",
  appId: "1:1092453591973:web:b88ecf098305e2f2fad64c",
  measurementId: "G-2Q2YST0TG3"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()




