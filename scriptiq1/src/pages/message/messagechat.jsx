import React, { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { CountContext } from "../../context";
import { baseUrl, endpoints } from "../../utils/endpoints";
import RoomJoiner from "../../components/roomjoiner";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCallData,
  selectCallData,
  selectCallLoading,
} from "../../redux/slices/userdataslice";
import { useLocation } from "react-router-dom";
import Header from "../../components/header";

// --- Generic Axios instance inside thunk ---

function Messagechat() {
  const baseUrl = endpoints?.baseURL;
  const { us } = useContext(CountContext); // { userid, partnerId, messageid_ }
  const textRef = useRef("");
  const toBottomRef = useRef(null);

  const dispatch = useDispatch();
  const callData = useSelector(selectCallData);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const story = location.state;
  // 1. Connect socket
  useEffect(() => {
    const newSocket = io(baseUrl);
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  // 2. Register user
  useEffect(() => {
    if (socket && us?.userid) {
      socket.emit("newUser", us.userid);
    }
  }, [socket, us]);

  // 3. Fetch old messages
  useEffect(() => {
    if (!us?.messageid_) return;
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${baseUrl}${endpoints.postMessageSearch}${us.messageid_}`
        );
        setMessages(res.data.messages || []);
      } catch (err) {
        console.error("❌ Error fetching messages:", err);
      }
    };
    fetchMessages();
  }, [us]);

  // 4. Listen for new incoming messages
  useEffect(() => {
    if (!socket) return;
    socket.on("getMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.off("getMessage");
  }, [socket]);

  // 5. Send message
  const sendMessage = () => {
    const text = textRef.current.value.trim();
    if (!text) return;

    const msg = {
      postId: us.messageid_,
      senderId: us.userid,
      receiverId: us.partnerId,
      message: text,
      createdAt: new Date(),
    };

    socket.emit("sendMessage", msg);

    setMessages((prev) => [...prev, { ...msg, _id: Date.now().toString() }]);

    textRef.current.value = "";
  };

  // Auto-scroll
  useEffect(() => {
    console.log(story, "oooooooooooo");
    toBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const user = {
    id: callData.user._id,
    name: callData.user.username,
    role: callData.user.role || "employee",
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header like Instagram */}
      <Header />
      <RoomJoiner storyId={story?._id} user={user} />
    </div>
  );
}

export default Messagechat;
