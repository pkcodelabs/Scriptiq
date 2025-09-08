// src/utils/socket.js
import { io } from "socket.io-client";
import { endpoints } from "./endpoints"; // optional, fallback URL

import { baseUrl } from "./endpoints";

const socket = io(baseUrl, {
  withCredentials: true,
  transports: ["websocket"],
  autoConnect: false, // ensures no polling fallback
});

export default socket;
