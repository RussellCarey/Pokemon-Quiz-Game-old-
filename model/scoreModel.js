const mongoose = require("mongoose");

const score = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    trim: true,
    // Validators
    maxlength: [10, "A tour name must have less that 40 characters"],
    minlength: [1, "A tour name must have more than 10 aharacters"],
    // Use the validator JS to use as a validator -
  },
  score: {
    type: Number,
    required: [true, "Need a score"],
  },
});

// Var name - name of model to use and schema
const ScoreModel = mongoose.model("ScoreModel", score);
module.exports = ScoreModel;
