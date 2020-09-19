const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: false,
    trim: true,
    // Validators
    maxlength: [12, "A name must have less that 8 characters"],
    minlength: [1, "A name must have more than 1 characters"],
    // Use the validator JS to use as a validator -
    validate: [validator.isAlpha, "Must be a letter only"],
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
