// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAwfMYxM19Frd0elkGzedMJue2_KEnF1PI",
  authDomain: "dashboard-22e35.firebaseapp.com",
  projectId: "dashboard-22e35",
  storageBucket: "dashboard-22e35.firebasestorage.app",
  messagingSenderId: "517042703375",
  appId: "1:517042703375:web:44d84ecfa2ccd96c5ae77a"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);