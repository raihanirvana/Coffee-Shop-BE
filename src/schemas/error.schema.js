const mongoose = require("mongoose");

// create schema
const errorSchema = new mongoose.Schema({
  status: { type: Number, required: true },
  message: String,
});

module.exports = errorSchema;
