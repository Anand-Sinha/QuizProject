const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.renderHomePage = (req, res, next) => {
  res.status(200).render("main");
};

exports.renderAddQuesPage = (req, res, next) => {
  res.status(200).render("addQues");
};

exports.renderLoginPage = catchAsync(async (req, res, next) => {
  res.status(200).render("login");
});

exports.renderSignUp = catchAsync(async (req, res, next) => {
  res.status(200).render("register");
});
