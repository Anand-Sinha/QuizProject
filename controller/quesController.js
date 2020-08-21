//jshint esversion:8
const Ques = require("../models/questionSchema");

exports.getAllQuestions = async (req, res, next) => {
  try {
    const questions = await Ques.find();
    res.status(200).json({
      status: "success",
      data: {
        data: questions,
      },
    });
    console.log("Everything is working fine until now");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      data: error,
    });
  }
};

exports.addQuestions = async (req, res, next) => {
  try {
    // console.log(req.body);
    var i;
    var no_Ques = req.body.count;
    var answers = [],
      a = [],
      option = req.body.answer,
      ans = req.body.val,
      question = req.body.question;

    for (i = 0; i < no_Ques; i++) {
      a.push(i);
      a[i] = false;
      if (ans == ("ans" + (i + 1))) {
        a[i] = true;
      }
    }
    for (i = 0; i < no_Ques; i++) {
      answers.push({
        text: option[i],
        correct: a[i]
      }, );
    }
    const ques = new Ques({
      question: question,
      answers: answers,
    });
    await ques.save(function(err, result) {
      if (err) {
        res.status(400).send("fail");
      } else {
        res.status(200).send("success");
      }
    });
  } catch (err) {
    console.log(err);
  }
};
