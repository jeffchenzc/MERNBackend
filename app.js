const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const indexRouter = require("./routes/index");

const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DEV_MONGO_ADDRESS, {
  useNewUrlParser: true,
  dbName: process.env.DATABASE,
});

/**
 * CORS setting for front-end communication
 */
app.use(
  cors({
    origin: process.env.CORS_ADDRESS,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", indexRouter);
app.use((req, res, next) => {
  let err = new Error("Can't find given endpoint");
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.status(err.status || 500).send(err.message);
});

module.exports = app;
