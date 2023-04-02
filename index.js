require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const { serverPort } = require("./src/configs/environment");
const PORT = serverPort || 8080;

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const morgan = require("morgan");
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(express.static("public"));

const masterRouter = require("./src/routers");
app.use(masterRouter);

// const { client } = require("./src/configs/mongodb");

// client
//   .connect()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server is running at port ${PORT}`);
//     });
//   })
//   .catch((err) => console.log(err));

const mongoose = require("mongoose");
const {
  mongoPass,
  mongoDbName,
  mongoDbHost,
  mongoDbUser,
} = require("./src/configs/environment");

mongoose
  .connect(
    `mongodb+srv://${mongoDbUser}:${mongoPass}@${mongoDbHost}/${mongoDbName}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Mongo DB Connected");
    app.listen(PORT, () => {
      console.log(`Server us running at port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
