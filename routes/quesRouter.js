//jshint esversion:8
const express = require("express");
const questionController = require("../controller/quesController");

//creating a route
const router = express.Router();

// setting up the controller
router.route("/").get(questionController.getAllQuestions);

module.exports = router;
