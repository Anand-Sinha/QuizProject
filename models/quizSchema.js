const mongoose = require("mongoose");
const shortId = require("shortid");
// shortId.characters('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
var data = shortId.generate;
// var shortData = data.toUpperCase();
console.log(data);
// var shortVal = shortData.slice(0,3) + shortData.slice(3,6) + shortData.slice(6,-1);
var quizSchema = new mongoose.Schema({
  question: {
    type: [Object],
    required: [true, "A Quiz must contain Questions"],
  },
  quizName: {
    type: String,
    required: [
      true,
      "A Quiz must have a Name. This will help you in sharing the quiz with others.",
    ],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, "A Quiz must have a creator"],
    ref: "User",
  },
  short:{
    type:String,
    required: true,
    default: data
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
