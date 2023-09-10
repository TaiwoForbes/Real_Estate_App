// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCunSOhG4Icwr8KgnMqQTvPo8dEDNt7taI",
  authDomain: "realtor-v2.firebaseapp.com",
  projectId: "realtor-v2",
  storageBucket: "realtor-v2.appspot.com",
  messagingSenderId: "500715795070",
  appId: "1:500715795070:web:ba2009226b783cf6825e2f"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()




