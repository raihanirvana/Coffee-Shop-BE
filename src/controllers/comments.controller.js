// const commentsModel = require("../models/comments.model");
const { error } = require("../configs/mongodb");

const logError = async (req, res) => {
  try {
    const result = await error.insertOne(req.body);
    res.status(201).json({
      data: result,
      msg: "OK",
    });
  } catch (err) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = { logError };
