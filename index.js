require("dotenv").config();
// const dotenv = require('dotenv')
// import dotenv from 'dotenv';
// dotenv.config()
// <es6 require
const express = require("express");
const cors = require("cors");
// >es6 import
// import exp from "express";

// create express application
const app = express();

const { serverPort } = require("./src/configs/environment");
const PORT = serverPort || 8080;

app.use(cors());
// parser untuk body
app.use(express.urlencoded({ extended: false })); // form-urlencoded
app.use(express.json()); // raw json
// body akan dimasukkan ke req.body

const morgan = require("morgan");
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.static("public"));

const masterRouter = require("./src/routers");
app.use(masterRouter);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
