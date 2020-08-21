//jshint esversion:8
const express = require("express");
const viewController = require("../controller/viewController");
const quesController = require("../controller/quesController");

//creating a route
const router = express.Router();

//setting up the controller functions on GET and POST request
router
  .route("/")
  .get(viewController.renderAddQuesPage)
  .post(quesController.addQuestions);

module.exports = router;
