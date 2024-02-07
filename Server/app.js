const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./Routes/authroute");
const chatsRoute = require("./Routes/chatsroute");
const messagesroute = require("./Routes/messagesroute");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config();

const app = express();

// CORS middleware configuration
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://messegit.vercel.app");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use(bodyparser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {})
  .catch((err) => {});

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://messegit.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId);
  });

  socket.on("sendMessage", ({ roomId, data }) => {
    io.to(roomId).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {});
});

// Routes
app.use("/chats", chatsRoute);
app.use("/auth", authRoute);
app.use("/messages", messagesroute);

server.listen(5000, () => {});
