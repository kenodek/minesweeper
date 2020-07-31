const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    email: true,
  },
  hash: String,
  boardSettings: {
    width: {
      type: Number,
      default: 10,
    },
    height: {
      type: Number,
      default: 10,
    },
    numberOfBombs: {
      type: Number,
      default: 10,
    },
  },
});

module.exports = model("User", userSchema);
