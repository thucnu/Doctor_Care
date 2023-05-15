import Messenger from "../../containers/messenger/Messenger";
import Message from "../../components/message/Message";
import HomeHeader from "../../containers/HomePage/HomeHeader";
import "./Chat.scss";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import {
  getChatsById,
  getMessagesByChatId,
  postMessages,
} from "../../services/userService";

export default function Chat() {
  const [chat, setChat] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const [currentChat, setCurrentChat] = useState(null);
  const scrollRef = useRef();

  const state = useSelector((state) => state);
  const userInfo = state.userHome.userHomeInfo;

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userInfo.id);
    socket.current.on("getUsers", (users) => {});
  }, [userInfo]);

  useEffect(() => {
    const getChats = async () => {
      try {
        const res = await getChatsById(userInfo.id);
        setChat(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getChats();
  }, [userInfo.id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await getMessagesByChatId(currentChat?.id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messages = {
      senderId: userInfo.id,
      text: newMessage,
      chatId: currentChat?.id,
    };

    const receiverId = currentChat?.members.find((m) => m !== userInfo.id);

    socket.current.emit("sendMessage", {
      senderId: userInfo.id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await postMessages(messages);
      setMessages((prevMessages) => [...prevMessages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <HomeHeader isShowBanner={false} />
      <div className="chat">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {chat.map((c, i) => (
              <div onClick={() => setCurrentChat(c)}>
                <Messenger key={i} chat={c} currentUser={userInfo} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.senderId == userInfo.id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <input
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></input>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">Open a conversation</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
