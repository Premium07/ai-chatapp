import "dotenv/config";
import http from "http";
import app from "./app.js";
import { Server } from "socket.io";
const PORT = process.env.PORT || 5000;
import jwt from "jsonwebtoken";

const server = http.createServer(app);
const io = new Server(server);

io.use((socket, next) => {
  try {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers.authorization?.split(" ")[1];

    if (!token) return next(new Error("Authentication Error"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) return next(new Error("Authentication error"));

    socket.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
});

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("event", (data) => {
    /* … */
  });
  socket.on("disconnect", () => {
    /* … */
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
