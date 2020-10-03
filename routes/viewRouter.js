//jshint esversion:8
const express = require("express");
const viewController = require("../controller/viewController");
const authController = require("../controller/authenticationController");

const router = express.Router();

router.route("/").get(viewController.renderHomePage);

router.get("/sign-up", viewController.renderSignUp);

router.get("/login", viewController.renderLoginPage);

router.get(
  "/create-quiz",
  authController.protect,
  viewController.renderAddQuizPage
);

router.get("/my-quiz", authController.protect, viewController.renderMyQuiz);

router.get("/start-quiz/:quizID", viewController.renderPlayQuizPage);

module.exports = router;

// // login page
// app.get("/login", function (req, res) {
//   res.render("login");
// });
// app.post("/login", function (req, res) {
//   console.log(req.body);
// });
// // registration page
// app.get("/register", function (req, res) {
//   res.render("register");
// });

// app.post("/register", function (req, res) {
//   console.log(req.body);
// });

// app.get("/pp", function (req, res) {
//   res.render("privacy");
// });
// app.get("/tc", function (req, res) {
//   res.render("tc");
// });
