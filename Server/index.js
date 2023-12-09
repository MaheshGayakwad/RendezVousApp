import express, { json } from "express";
import cors from "cors";
import userRoute from "./Routes/userRouter.js";
import chatRoute from "./Routes/chatRoute.js";
import messageRoute from "./Routes/messageRoute.js";
import connectDB from "./config/db.js";

import { createServer } from "node:http";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("App is running smooth as butter ;)");
});

app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/message", messageRoute);

app.use((req, res, next) => {
  res.status(404).json({ message: "404 Page not found :(" });
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  //when we click a perticulat chat users should join this room automatically

  socket.on("join room", (room) => {
    socket.join(room);
    console.log("Joined Room using " + room);
  });

  socket.on("message", (newMessage) => {
    var chats = newMessage.chat;

    console.log(newMessage.chat);

    chats.users.forEach((user) => {
      // if (user._id === newMessage.sender._id) {
      //   return;
      // }

      socket.to(user._id).emit("message received", newMessage);
    });
  });
});

server.listen(3000, () => {
  console.log("server running ");
});
