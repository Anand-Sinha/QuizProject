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
  const newQuiz = await Quiz.create({
    question: req.body.question,
    quizName: req.body.quizName,
    user: req.user._id,
    // user: req.cookies.user,
    //
  });

  res.status(201).json({
    status: "Success",
    data: {
      data: newQuiz,
    },
  });
});

exports.getQuiz = catchAsync(async (req, res, next) => {
  const { user, quizName } = req.params;
  console.log(user, quizName);

  const quiz = await Quiz.find({ user, quizName });

  res.status(200).json({
    status: "success",
    data: quiz,
  });
});
