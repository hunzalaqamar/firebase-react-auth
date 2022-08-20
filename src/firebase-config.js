// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCaASfuUU743ViimXkxBjueA3_6JbvcyR4",
  authDomain: "fir-react-auth-4869c.firebaseapp.com",
  projectId: "fir-react-auth-4869c",
  storageBucket: "fir-react-auth-4869c.appspot.com",
  messagingSenderId: "513311008155",
  appId: "1:513311008155:web:cd6985781d15a3c6922d3e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
