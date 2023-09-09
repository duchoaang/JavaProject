import { useState, useEffect, useReducer } from "react";

import { set } from 'firebase/database';
import MyUserReducer from "../../components/Reducers/MyUserReducer";
import cookie from 'react-cookies'
import { info } from "sass";
import React, { Fragment, useContext } from 'react';
import { collection, addDoc, getDocs, onSnapshot, query, where, } from "firebase/firestore"; 
import {db} from  '../../firebase/firebase';
import { addDocument } from "../../firebase/service";



const Login = () =>{
    const [name, setName] = useState("");
   
    return (
        <>
          <h1>hay dang nhap</h1>
        </>
    )
}



const ShowChat = ({ props }) => {
    const [inputMess, setInputMess] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      getMessages();
    },[props])
  
    function getMessages() {
      const messageRef = collection(db, 'messages');

      getDocs(messageRef)
      .then(response => {
          const mess = response.docs.map(doc => ({
            data: doc.data(),
            id: doc.id,
          }))
          setMessages(mess)        })
      .catch(e => console.log(e.message));
      // onSnapshot(messageRef, (querySnapshot) => {
      //   const mess = querySnapshot.docs.map((doc) => ({
      //     data: doc.data(),
      //     id: doc.id,
      //   }));
      //   setMessages(mess);
      // });
    }


    // them messages 
    const addMessage = async () => {
       {
        try {
          const docRef = await addDoc(collection(db, 'message'), {
            id: props.id,
            message: inputMess,

          });
          console.log("Document written with ID: ", docRef.id);
          setInputMess(""); 

          getMessages(); 
        } catch (e) {
          console.error("Error adding document: ", e.message);
        }
      }
    };

    console.log(inputMess);
    return (
      <>
          <h1>Hello {props.name}</h1>
          <input onChange={(e) => setInputMess(e.target.value)} type="text" />
          <button onClick={addMessage}>Send</button>
      <ul>
        {
          messages.map(mess => (
            <>
              <li>{mess.data.wedfqwde}</li>
            </>
              // mess.data.name.map(message => (
                
              //   <>
              //     <li>message.name</li>
              //   </>
              // )) 
          ))
        }
        1231
      </ul>
      
    </>
    );
  }
  
const Chat = () => {
    const [showChat, setShowChat] = useState(false);
    const [infoUserLogin, setInfoUserLogin] = useState([]);
    const [name, setName] = useState("");
    const [user, dispatch] = useReducer(MyUserReducer, cookie.load("user") || null);  
    const getName = (name) =>{
        setName(name);
        setShowChat(true);
    }

    const checkIfUserExists = async (email) => {
      const usersCollection = collection(db, "users");
      const q = query(usersCollection, where("email", "==", email));
      const querySnapshot = await getDocs(q);
    
      return !querySnapshot.empty;
    };
    const addUserIfNotExists = async () => {
      const email = user.data.email;
      const userExists = await checkIfUserExists(email);
    
      if (!userExists) {
        try {
          const docRef = await addDoc(collection(db, "users"), {
            name: user.data.ten,
            email: email,
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e.message);
        }
      } else {
        console.log("User already exists with email: ", email);
      }
    };
    addUserIfNotExists();
    


    useEffect(() => {
      if(user != null){
        setInfoUserLogin({
          id: user.data.id,
          name : user.data.ten,
          

        })
        setShowChat(true);

      }
      else {
        setShowChat(false);
      }
    }, [])
    
   

    return (
        <>
        <div className="App">
          {!showChat &&  <Login/>}

            {user &&  <ShowChat props={infoUserLogin} />}
        </div>
        </>
    )
}

export default Chat