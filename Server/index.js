const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./Routes/authroute");
const chatsRoute = require("./Routes/chatsroute");
const messagesroute = require("./Routes/messagesroute");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(bodyparser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log("Database connection error: " + err);
  });

app.use("/chats", chatsRoute);
app.use("/auth", authRoute);
app.use("/messages", messagesroute);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
