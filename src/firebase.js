// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAch1CBFAWehI3ShAZYeJH0ETaIvExwzUE",
  authDomain: "chat-app-6178d.firebaseapp.com",
  projectId: "chat-app-6178d",
  storageBucket: "chat-app-6178d.appspot.com",
  messagingSenderId: "248240026771",
  appId: "1:248240026771:web:8099f2d80025c639bec966",
 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export {database, ref, push, onValue}