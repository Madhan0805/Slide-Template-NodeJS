require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const APIRouter = require("./routes/apiroutes");
const path = require("path");

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extends: false }));

let public_path = path.join(__dirname, "public");
app.use(express.static(public_path));

app.use("/api", APIRouter);
console.log("connection to db...");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, function () {
      console.log("db connected!");
      console.log("server is running on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

// MONGODB_URI = mongodb://127.0.0.1:27017/test
