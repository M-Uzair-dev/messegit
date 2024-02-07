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

// CORS middleware configuration for regular HTTP requests
app.use(
  cors({
    origin: "https://messegit.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(bodyparser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {})
  .catch((err) => {});

const server = http.createServer(app);
const io = socketIo(server);

// Configure CORS for socket.io connections
io.use((socket, next) => {
  // Allow connections from https://messegit.vercel.app
  const origin = socket.request.headers.origin;
  if (origin === "https://messegit.vercel.app") {
    return next(null, true);
  }
  // Reject connections from other origins
  return next(new Error("Unauthorized origin"));
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

server.listen(5000, () => {
  console.log("Server listening on port 5000");
});
