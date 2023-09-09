import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';



// Your web app's Firebase configuration
const firebaseConfig = { 
  apiKey : "AIzaSyB1w21xSU7NiTeP4W6Uc7Bjpv5J_kf9JMY" , 
  authDomain : "chatrealtime-fd127.firebaseapp.com" , 
  projectId : "chatrealtime-fd127" , 
  storageBucket : "chatrealtime-fd127.appspot.com" , 
  messagingSenderId : "291199200032" , 
  appId : "1:291199200032:web:3c03ccdd9ed560ba0ac545" 
};



const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
