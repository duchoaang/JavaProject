import { useState, useEffect } from "react";
import {database, ref, push, onValue} from '../../firebase';
import { set } from 'firebase/database';


const Login = ({callback}) =>{
    const [name, setName] = useState("");
    const handleClick = () => {
        callback(name);
    }
    return (
        <>
        <div>
            <input type="text" value={name} onChange={(e) => {
                setName(e.target.value);
            }} />
            <button onClick={handleClick}>Dang nhap</button>
        </div>
        </>
    )
}

const ShowChat = ({ props }) => {
    const [inputMess, setInputMess] = useState("");
    const [messages, setMessages] = useState([]);
  
    useEffect(() => {
      const messagesRef = ref(database, 'message'); 
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const messageList = Object.values(data);
          setMessages(messageList);
        }
      });
    }, []);
  
    const handleSendMessage = () => {
      const newMessage = {
        name: props,
        message: inputMess,
      };
      push(ref(database, 'message'), newMessage);
     setInputMess("");
    };
    const handleDeleteAllData = () => {
        const rootRef = ref(database); // Đường dẫn tới nút gốc của database
        set(rootRef, null)
          .then(() => {
            console.log('Tất cả dữ liệu đã được xóa thành công');
          })
          .catch((error) => {
            console.error('Lỗi xóa dữ liệu:', error);
          });
      };
  
    return (
      <>
        <h1>Hello {props}</h1>
        <button onClick={handleDeleteAllData}>Xóa Toàn Bộ Dữ Liệu</button>
        <ul> 
          {messages.map((message, index) => (
            <li key={index}>
              <span>{message.name} : </span>
              <span>{message.message}</span>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={inputMess}
          onChange={(e) => setInputMess(e.target.value)}
        />
        <button onClick={handleSendMessage}>Gửi</button>
      </>
    );
  }
  
const Chat = () => {
    const [showChat, setShowChat] = useState(false);
    const [name, setName] = useState("");
    const getName = (name) =>{
        setName(name);
        setShowChat(true);
    }
   

    return (
        <>
        <div className="App">
            {!showChat && <Login callback={getName}/>}
            {showChat &&  <ShowChat props={name} />}
        </div>
        </>
    )
}

export default Chat