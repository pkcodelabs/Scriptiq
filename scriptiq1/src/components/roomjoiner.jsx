// import { useEffect, useState } from "react";
// import socket from "../utils/socket";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchCallData,
//   selectCallData,
//   selectCallLoading,
// } from "../redux/slices/userdataslice";

// function RoomJoiner({ storyId, user }) {
//   const dispatch = useDispatch();
//   const callData = useSelector(selectCallData);
//   const [status, setStatus] = useState("Disconnected");
//   const [messages, setMessages] = useState([]); // chat history
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     if (!storyId || !user) return;

//     socket.connect();

//     // join the story room with callback
//     socket.emit("joinRoom", { storyId, user }, (response) => {
//       if (response?.success) {
//         console.log("✅ Joined room:", response.room);
//         setStatus(`Joined room: ${response.room}`);
//       } else {
//         console.error("❌ Join failed:", response?.error);
//         setStatus(`Error: ${response?.error || "Failed to join"}`);
//       }
//     });

//     // listen for incoming messages
//     socket.on("message", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//     });

//     // handle disconnect
//     socket.on("disconnect", () => {
//       console.log("🔌 Disconnected");
//       setStatus("Disconnected");
//     });

//     return () => {
//       socket.off("message");
//       socket.off("disconnect");
//       socket.disconnect();
//     };
//   }, [storyId, user]);

//   // send message with callback
//   const sendMessage = () => {
//     if (!input.trim()) return;
//     const msg = { text: input, user, storyId, time: new Date() };

//     socket.emit("message", msg, (ack) => {
//       if (ack?.success) {
//         console.log("✅ Message delivered:", ack.id);
//         // add to local messages only when confirmed
//         setMessages((prev) => [...prev, msg]);
//       } else {
//         console.error("❌ Message failed:", ack?.error);
//       }
//     });

//     setInput("");
//   };

//   return (
//     <div className="flex flex-col h-screen p-4">
//       <h2 className="text-lg font-bold mb-2">📖 Story Chat</h2>
//       <p className="text-sm text-gray-500 mb-4">Status: {status}</p>

//       {/* Chat window */}
//       <div className="flex-1 overflow-y-auto border rounded-lg p-2 mb-2 bg-gray-50">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`p-2 my-1 rounded-lg max-w-xs ${
//               msg.user.id === user.id
//                 ? "bg-blue-500 text-white ml-auto"
//                 : "bg-gray-200 text-black mr-auto"
//             }`}
//           >
//             <p className="text-sm font-semibold">{msg.user.name}</p>
//             <p>{msg.text}</p>
//             <span className="text-xs opacity-70">
//               {new Date(msg.time).toLocaleTimeString()}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Input */}
//       <div className="flex gap-2">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1 border rounded-lg px-3 py-2"
//         />
//         <button
//           onClick={sendMessage}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default RoomJoiner;
// import { useEffect, useState } from "react";
// import socket from "../utils/socket";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchCallData,
//   selectCallData,
//   selectCallLoading,
// } from "../redux/slices/userdataslice";

// function RoomJoiner({ storyId, user }) {
//   const dispatch = useDispatch();
//   const callData = useSelector(selectCallData);
//   const [status, setStatus] = useState("Disconnected");
//   const [messages, setMessages] = useState([]); // chat history
//   const [input, setInput] = useState("");

//   // --- Load all chats dictionary from localStorage ---
//   const loadAllChats = () => {
//     try {
//       const saved = localStorage.getItem("chats");
//       return saved ? JSON.parse(saved) : {};
//     } catch (e) {
//       console.error("Failed to load chats", e);
//       return {};
//     }
//   };

//   // --- Save all chats dictionary back to localStorage ---
//   const saveAllChats = (chats) => {
//     try {
//       localStorage.setItem("chats", JSON.stringify(chats));
//     } catch (e) {
//       console.error("Failed to save chats", e);
//     }
//   };

//   // --- Load messages for a given storyId ---
//   const loadMessages = (id) => {
//     const allChats = loadAllChats();
//     return allChats[id] || [];
//   };

//   // --- Save messages for a given storyId ---
//   const saveMessages = (id, msgs) => {
//     const allChats = loadAllChats();
//     allChats[id] = msgs;
//     saveAllChats(allChats);
//   };

//   useEffect(() => {
//     if (!storyId || !user) return;

//     // Load previous messages from localStorage dictionary
//     const localMsgs = loadMessages(storyId);
//     setMessages(localMsgs);

//     socket.connect();

//     // join the story room with callback
//     socket.emit("joinRoom", { storyId, user }, (response) => {
//       if (response?.success) {
//         console.log("✅ Joined room:", response.room);
//         setStatus(`Joined room: ${response.room}`);
//       } else {
//         console.error("❌ Join failed:", response?.error);
//         setStatus(`Error: ${response?.error || "Failed to join"}`);
//       }
//     });

//     // listen for incoming messages
//     socket.on("message", (msg) => {
//       setMessages((prev) => {
//         const updated = [...prev, msg];
//         saveMessages(storyId, updated);
//         return updated;
//       });
//     });

//     // handle disconnect
//     socket.on("disconnect", () => {
//       console.log("🔌 Disconnected");
//       setStatus("Disconnected");
//     });

//     return () => {
//       socket.off("message");
//       socket.off("disconnect");
//       socket.disconnect();
//     };
//   }, [storyId, user]);

//   // send message with callback
//   const sendMessage = () => {
//     if (!input.trim()) return;
//     const msg = { text: input, user, storyId, time: new Date() };

//     socket.emit("message", msg, (ack) => {
//       if (ack?.success) {
//         console.log("✅ Message delivered:", ack.id);
//         setMessages((prev) => {
//           const updated = [...prev, msg];
//           saveMessages(storyId, updated);
//           return updated;
//         });
//       } else {
//         console.error("❌ Message failed:", ack?.error);
//       }
//     });

//     setInput("");
//   };

//   return (
//     <div className="flex flex-col h-screen p-4">
//       <h2 className="text-lg font-bold mb-2">📖 Story Chat</h2>
//       <p className="text-sm text-gray-500 mb-4">Status: {status}</p>

//       {/* Chat window */}
//       <div className="flex-1 overflow-y-auto border rounded-lg p-2 mb-2 bg-gray-50">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`p-2 my-1 rounded-lg max-w-xs ${
//               msg.user.id === user.id
//                 ? "bg-blue-500 text-white ml-auto"
//                 : "bg-gray-200 text-black mr-auto"
//             }`}
//           >
//             <p className="text-sm font-semibold">{msg.user.name}</p>
//             <p>{msg.text}</p>
//             <span className="text-xs opacity-70">
//               {new Date(msg.time).toLocaleTimeString()}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Input */}
//       <div className="flex gap-2">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1 border rounded-lg px-3 py-2"
//         />
//         <button
//           onClick={sendMessage}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default RoomJoiner;
// ChatBox.jsx
import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { endpoints } from "../utils/endpoints"; // optional, fallback URL

// --- Generic Axios instance inside thunk ---
const baseUrl = endpoints?.baseURL;

let socket;

function RoomJoiner({ storyId, user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const token = localStorage.getItem("token");

  // Fetch existing messages
  useEffect(() => {
    if (!storyId) return;
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${baseUrl}/messages/${storyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        console.error("❌ Fetch error:", err);
      }
    };
    fetchMessages();
  }, [storyId, token]);

  // Socket setup
  useEffect(() => {
    socket = io(baseUrl, { withCredentials: true });

    socket.emit("joinRoom", { storyId, user });

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [storyId, user]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const tempMsg = {
      storyId,
      content: input,
      sender: { _id: user.id, username: user.username },
      createdAt: new Date().toISOString(), // temp timestamp
      temp: true, // mark as temporary if needed
    };

    // 1️⃣ Emit immediately to Socket.IO
    socket.emit("message", tempMsg);

    // 2️⃣ Optimistic UI update
    // setMessages((prev) => [...prev, tempMsg]);
    setInput("");

    try {
      // 3️⃣ Save in DB
      const res = await axios.post(
        `${baseUrl}/messages/${storyId}`,
        { content: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const savedMsg = res.data;

      // 4️⃣ Replace temp message with saved one (optional)
      setMessages((prev) =>
        prev.map((msg) =>
          msg.temp && msg.content === tempMsg.content ? savedMsg : msg
        )
      );
    } catch (err) {
      console.error("❌ Send error:", err);
      // Optionally remove temp message on error
      setMessages((prev) => prev.filter((msg) => msg !== tempMsg));
    }
  };

  return (
    <div className="flex flex-col h-full border rounded-lg bg-white">
      {/* Chat window */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg ${
              msg.sender?._id === user.id
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-black self-start mr-auto"
            } max-w-xs`}
          >
            <div className="text-sm font-semibold">
              {msg.sender?.username || msg.user?.name || "Unknown"}
            </div>
            <div>{msg.content || msg.text}</div>
            <div className="text-xs opacity-60">
              {new Date(msg.createdAt || msg.time).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="flex border-t p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-l-lg p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded-r-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default RoomJoiner;
