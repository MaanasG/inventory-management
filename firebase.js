// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGUbg4o2DduuBAjRoQHuQ9vDm1L0OCMGw",
  authDomain: "inventory-management-6396c.firebaseapp.com",
  projectId: "inventory-management-6396c",
  storageBucket: "inventory-management-6396c.appspot.com",
  messagingSenderId: "242904588101",
  appId: "1:242904588101:web:0eb7d57cb6f7facf9be82c",
  measurementId: "G-RQCS0CT3NE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export {firestore}