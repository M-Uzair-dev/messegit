const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./Routes/authroute");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://messegit:messegit576@messegit.fmalf6v.mongodb.net/messegit?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database connected !");
  })
  .catch((err) => {
    console.log("database connection error : " + err);
  });

app.get("/", (req, res) => {
  res.send("Welcome to MesseGit API");
});

app.use("/auth", auth);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
