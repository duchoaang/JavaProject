import { useState, useEffect, useReducer } from "react";

import { set } from "firebase/database";
import MyUserReducer from "../../components/Reducers/MyUserReducer";
import cookie from "react-cookies";

import { info } from "sass";
import React, { Fragment, useContext } from "react";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { addDocument } from "../../firebase/service";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from "mdb-react-ui-kit";

import styles from "./Chat.module.scss";
import Button2 from "@mui/material/Button";
import { Button } from "bootstrap";

const Login = () => {
  const [name, setName] = useState("");

  return (
    <>
      <h1>hay dang nhap</h1>
    </>
  );
};
function ShowChat({ props }) {
  const [inputMess, setInputMess] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null); // Lưu ID của phòng đang được chọn

  // Thêm messages
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Truy vấn tất cả các phòng từ Firestore
    const fetchRooms = async () => {
      const roomsCollection = collection(db, "rooms");
      const querySnapshot = await getDocs(roomsCollection);

      const roomsData = [];
      querySnapshot.forEach((doc) => {
        // Lấy dữ liệu của từng phòng và thêm vào mảng
        roomsData.push({ id: doc.id, ...doc.data() });
      });

      // Cập nhật state với danh sách phòng
      setRooms(roomsData);
    };

    // Gọi hàm fetchRooms để lấy dữ liệu phòng
    fetchRooms();
  }, []);
  useEffect(() => {
    if (selectedRoomId) {
      const unsubscribe = onSnapshot(
        query(
          collection(db, "messages"),
          where("roomId", "==", selectedRoomId)
        ),
        (snapshot) => {
          const messagesArray = [];
          snapshot.forEach((doc) => {
            const messageData = doc.data();
            const messageWithSender = {
              name: messageData.name,
              message: messageData.noiDung,
              userId: messageData.userId,
              roomId: selectedRoomId,
              timestamp: messageData.timestamp,
            };
            messagesArray.push(messageWithSender);
          });
          setMessages(messagesArray);
        }
      );

      return () => {
        unsubscribe();
      };
    }
  }, [selectedRoomId]);

  const addMessage = async () => {
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        name: props.name,
        noiDung: inputMess,
        roomId: selectedRoomId,
        timestamp: serverTimestamp(),
        userId: props.id,
      });
      console.log("Document written with ID: ", docRef.id);
      setInputMess("");
    } catch (e) {
      console.error("Error adding document: ", e.message);
    }
  };

  const deleteAllMessages = async () => {
    try {
      // Lấy tất cả tài liệu trong collection "message"
      const messageCollection = collection(db, "message");
      const messageQuery = query(messageCollection);

      const querySnapshot = await getDocs(messageQuery);

      // Xóa tất cả tài liệu
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      console.log("Đã xóa tất cả tin nhắn");
    } catch (error) {
      console.error("Lỗi khi xóa tất cả tin nhắn: ", error);
    }
  };

  console.log(messages);
  return (
    <div>
      <h1 style={{display:'flex', justifyContent:'center', color:'red'}}>Hello {props.name}</h1>
      <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
        <MDBRow>
          <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
            <MDBCard>
              <MDBCardBody>
                <MDBTypography listUnStyled className="mb-0">
                  <div>
                    <h2>Chọn phòng</h2>
                    {rooms.map(
                      (room, index) =>
                        room.id == props.id &&
                        room.id != 24 && (
                          <>
                            <button
                              key={index}
                              onClick={() => setSelectedRoomId(room.id)} // Xác định phòng được chọn
                              style={{ cursor: "pointer" }}
                            >
                              Phòng {room.id}
                            </button>
                          </>
                        )
                    )}

                    {props.id == 24 && (
                      <>
                        {rooms.map((room, index) => (
                          <>
                            <button
                              key={index}
                              onClick={() => setSelectedRoomId(room.id)} // Xác định phòng được chọn
                              style={{ cursor: "pointer" }}
                            >
                              Phòng {room.id}
                            </button>
                          </>
                        ))}
                      </>
                    )}
                  </div>
                </MDBTypography>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="6" lg="7" xl="8">
            <MDBTypography listUnStyled>
              {messages
                .sort((a, b) => a.timestamp - b.timestamp)
                .map((message) => (
                  <>
                    {message.userId === props.id && (
                      <li class="d-flex justify-content-between mb-4">
                        <MDBCard className="w-100">
                          <MDBCardHeader className="d-flex justify-content-between p-3">
                            <p class="fw-bold mb-0">{message.name}</p>
                            <p class="text-muted small mb-0">
                              <MDBIcon far icon="clock" /> 13 mins ago
                            </p>
                          </MDBCardHeader>
                          <MDBCardBody>
                            <p className="mb-0">{message.message}</p>
                          </MDBCardBody>
                        </MDBCard>
                      </li>
                    )}

                    {message.userId != props.id && (
                      <>
                        <li className="d-flex justify-content-between mb-4">
                          <MDBCard>
                            <MDBCardHeader className="d-flex justify-content-between p-3">
                              <p className="fw-bold mb-0">{message.name}</p>
                              <p className="text-muted small mb-0">
                                <MDBIcon far icon="clock" /> 10 mins ago
                              </p>
                            </MDBCardHeader>
                            <MDBCardBody>
                              <p className="mb-0">{message.message}</p>
                            </MDBCardBody>
                          </MDBCard>
                        </li>
                      </>
                    )}
                  </>
                ))}

              <li
                className="bg-white mb-3"
                style={{ display: "flex"}}
              >
                {/* <MDBTextArea label="Message" id="textAreaExample" rows={4} /> */}
                <input
                  style={{'margin-top':'20px', width:'100%', height:'30px', marginLeft:'50px', marginBottom:'10px'}}
                  onChange={(e) => setInputMess(e.target.value)}
                  type="text"
                />
                <div className="action_btn" style={{marginTop:'10px', display:'flex', width:'70%', height:'40px', justifyContent:'flex-end'}}>
                  <Button2
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: "20px" }}
                    onClick={addMessage}
                  >
                    Send
                  </Button2>
                  {props.id == 24 && (
                    <>
                      <Button2
                        variant="contained"
                        color="warning"
                        style={{ marginLeft: "20px" }}
                        onClick={deleteAllMessages}
                      >
                        Xóa tất cả tin nhắn
                      </Button2>
                    </>
                  )}
                </div>
              </li>
            </MDBTypography>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {/* Hiển thị dữ liệu từ state messages */}
    </div>
  );
}

const Chat = () => {
  const [showChat, setShowChat] = useState(false);
  const [infoUserLogin, setInfoUserLogin] = useState([]);
  const [name, setName] = useState("");
  const [user, dispatch] = useReducer(
    MyUserReducer,
    cookie.load("user") || null
  );

  const checkIfUserExists = async (db, userId) => {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("id", "==", userId));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty;
  };
  useEffect(() => {
    const addUserIfNotExists = async () => {
      // Kiểm tra xem người dùng có tồn tại trong bảng "users" hay không
      const userExists = await checkIfUserExists(db, user.data.id); // Truyền 'db' vào hàm
      console.log(userExists);
      if (!userExists) {
        try {
          // Thêm người dùng mới vào bảng "users" nếu họ chưa tồn tại
          const docRef = await addDoc(collection(db, "users"), {
            id: user.data.id,
            name: user.data.ten,
            roomId: user.data.id,
          });
          const roomRef = await addDoc(collection(db, "rooms"), {
            id: user.data.id,
            tenPhong: "Hỗ trợ user",
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e.message);
        }
      } else {
        console.log("User already exists with ID: ", user.data.id);
      }
    };

    addUserIfNotExists();
  }, []);

  useEffect(() => {
    if (user != null) {
      setInfoUserLogin({
        id: user.data.id,
        name: user.data.ten,
      });
      setShowChat(true);
    } else {
      setShowChat(false);
    }
  }, []);

  return (
    <>
      <div className="App">
        {!showChat && <Login />}

        {user && <ShowChat props={infoUserLogin} />}
      </div>
    </>
  );
};

export default Chat;
