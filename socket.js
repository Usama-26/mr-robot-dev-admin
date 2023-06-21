import { io } from "socket.io-client";
const socket = io.connect(
  "https://mr-robobt-dev-backend-development.up.railway.app/"
);

export default socket;
