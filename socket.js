import { io } from "socket.io-client";
const socket = io.connect("https://cryomadness.com");

export default socket;
