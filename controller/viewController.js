const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.renderHomePage = (req, res, next) => {
  if (!req.cookies.jwt) {
    res.status(200).render("main");
  } else {
    res.status(200).render("mainl");
  }
};

exports.renderAddQuizPage = catchAsync(async (req, res, next) => {
  res.status(200).render("addQuiz");
  next();
});

exports.renderLoginPage = catchAsync(async (req, res, next) => {
  res.status(200).render("login");
});

exports.renderSignUp = catchAsync(async (req, res, next) => {
  res.status(200).render("register");
});

exports.renderMyQuiz = catchAsync(async (req, res, next) => {
  res.status(200).render("index");
});

exports.renderPlayQuizPage = catchAsync(async (req, res, next) => {
  res.status(200).render("home");
});
