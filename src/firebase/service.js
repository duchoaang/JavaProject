import  {db} from './firebase';
import {addDoc, collection} from 'firebase/firestore';

export const addDocument = (data, table) =>  {
    try {
        const docRef = addDoc(collection(db, table), {
          ...data,
        });
      
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      
}