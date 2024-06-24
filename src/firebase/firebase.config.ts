// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApzVomm-la6zIDZUuLdzEwt0JHrrs8igI",
  authDomain: "crm-backend-3d69b.firebaseapp.com",
  projectId: "crm-backend-3d69b",
  storageBucket: "crm-backend-3d69b.appspot.com",
  messagingSenderId: "436154305868",
  appId: "1:436154305868:web:3026223f3095f7ffd4d3e9",
  measurementId: "G-CQR9D37L2M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebaseDatabase = getDatabase(app);

