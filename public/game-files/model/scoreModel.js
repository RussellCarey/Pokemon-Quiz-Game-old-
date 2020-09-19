const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    trim: true,
  },
  score: {
    type: Number,
    required: [true, "A tour must have a duration"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Var name - name of model to use and schema
const User = mongoose.model("User", userSchema);

module.exports = User;

// VALIDATOR JS CAN BE USED AS A GOOD VALIDATOR THING
