const express = require("express");
const authController = require("../controller/authenticationController");
const quizController = require("../controller/quizController");

//creating a route
const router = express.Router();

//setting up the controller functions on GET and POST request
router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    quizController.getAllQuiz
  )
  .post(authController.protect, quizController.addQuiz);

router
  .route("/:user/:quizName")
  .get(authController.protect, quizController.getQuiz);

module.exports = router;
