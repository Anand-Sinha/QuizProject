//jshint esversion:8
const mongoose = require("mongoose");

var quesSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answers: [
    {
      text: {
        type: String,
        required: true,
      },
      correct: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

const Ques = mongoose.model("Ques", quesSchema);

module.exports = Ques;
