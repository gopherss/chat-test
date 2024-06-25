// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRxGmRKJPSujm6FTO_LPVo502UkSgT5yk",
  authDomain: "prueba-a7c5a.firebaseapp.com",
  databaseURL: "https://prueba-a7c5a-default-rtdb.firebaseio.com",
  projectId: "prueba-a7c5a",
  storageBucket: "prueba-a7c5a.appspot.com",
  messagingSenderId: "927555907850",
  appId: "1:927555907850:web:7cb53936670954fc434af3",
  measurementId: "G-6CGEN4VR0M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebaseDatabase = getDatabase(app);

