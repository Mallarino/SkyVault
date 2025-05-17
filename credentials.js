// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjxN4WYj0-D966SczgRWkRzL65FTm3Kzk",
  authDomain: "planecards-58d94.firebaseapp.com",
  projectId: "planecards-58d94",
  storageBucket: "planecards-58d94.firebasestorage.app",
  messagingSenderId: "109015449878",
  appId: "1:109015449878:web:8ccdf64148d3720b561037"
};

// Initialize Firebase
const appFireBase = initializeApp(firebaseConfig);

export default appFireBase