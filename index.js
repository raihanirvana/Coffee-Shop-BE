require("dotenv").config();
const express = require("express");

const app = express();
const PORT = 8080;

//parser
app.use(express.urlencoded({ extended: false })); //form url
app.use(express.json());

const masterRouter = require("./src/routers");
app.use(masterRouter);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
