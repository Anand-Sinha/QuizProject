const express = require("express");
const authController = require("../controller/authenticationController");
const quizController = require("../controller/quizController");
const { route } = require("./viewRouter");

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

// router for getting all quiz of a particular user
router
  .route("/user/:user")
  .get(authController.protect, quizController.getQuizByUser);

// router for getting quiz with quizID
router.get("/:quizId", quizController.getQuizByid);

module.exports = router;
