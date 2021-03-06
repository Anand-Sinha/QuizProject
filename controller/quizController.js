//jshint esversion: 8
const Quiz = require("../models/quizSchema");
const catchAsync = require("../utils/catchAsync");

exports.getAllQuiz = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.find();

  res.status(200).json({
    status: "success",
    data: quiz,
  });
});

exports.addQuiz = catchAsync(async (req, res, next) => {

  // console.log(req.body);
  // console.log(req.user);
  // console.log(`cookie:- ${req.cookies}`);
  // console.log(req.body._id);
  // console.log(req.body.user);
  const newQuiz = await Quiz.create({
    question: req.body.question,
    quizName: req.body.quizName,
    user: req.user._id,
    // req.user._id || req.body.user,
    // user: req.cookies.user,
    //
  });

    console.log("here");
    console.log(newQuiz);
  res.status(201).json({
    status: "Success",
    data: {
      data: newQuiz,
    },
  });
});

exports.getQuizByUser = catchAsync(async (req, res, next) => {
  const { user } = req.params;

  const quiz = await Quiz.find({ user });

  res.status(200).json({
    status: "success",
    data: quiz,
  });
});

exports.getQuizByid = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;

  // const quiz = await Quiz.findById(quizId);
  const quiz = await Quiz.findOne({short: quizId }, function(err, result) {
    if (err){
      console.log(err);
    }
    if(result==null){
      console.log("No Quiz Found");
    }
  });
  res.status(200).json({
    status: "success",
    data: quiz,
  });
});
