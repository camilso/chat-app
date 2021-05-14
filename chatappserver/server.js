const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server, {
  cors: {
    origin: "https://609d6241cada021bf63ee30b--chat-app-mernn.netlify.app/",
    methods: ["GET", "POST", "PUT"],
  },
});
const usersRouter = require("./routes/users");
const messagesRouter = require("./routes/messages");
const roomsRouter = require("./routes/rooms");
dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Baza danych podpięta")
);
mongoose.set("useCreateIndex", true);
app.use(express.json());
app.use(cors());
app.use("/api/users", usersRouter);
app.use("/api/message", messagesRouter);
app.use("/api/rooms", roomsRouter);

let users = [];

const addUser = (userName, socketId) => {
  !users.some((user) => user.userName === userName) &&
    users.push({ userName, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
io.on("connection", (socket) => {
  console.log("user connect");
  //getOnlineUsers
  socket.on("getUser", (username) => {
    addUser(username, socket.id);
    io.emit("getUsers", users);
  });
  //addRoom
  socket.on("addRoom", (roomName, desc, rooms) => {
    console.log(rooms);
    let ActualRooms = rooms;
    ActualRooms.push({ roomName, desc });
    io.emit("getRooms", rooms);
  });
  socket.on("sendMessages", (content, senderName, room, messages) => {
    let ActualMessages = messages;
    ActualMessages.push({ content, senderName, room });
    let filterMessages = ActualMessages.filter((mess) => mess.room === room);
    io.emit("getMessages", filterMessages);
  });
  socket.on("deleteMessage", (message) => {
    message.isDeleted = true;
    io.emit("displayDeleted", message);
  });
  socket.on("disconnect", () => {
    console.log("user disconnect");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

const PORT = process.env.PORT || 1337;
server.listen(PORT, () => console.log(`serwer nasłuchuje na porcie ${PORT}`));
