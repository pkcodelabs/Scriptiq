// src/utils/socket.js
import { io } from "socket.io-client";
import { endpoints } from "../utils/endpoints"; // optional, fallback URL

const baseUrl = endpoints?.baseURL;

const socket = io(baseUrl, {
  withCredentials: true,
  transports: ["websocket"],
  autoConnect: false, // ensures no polling fallback
});

export default socket;
