//jshint esversion:8
const express = require("express");
const viewController = require("../controller/viewController");

const router = express.Router();

router.route("/").get(viewController.renderHomePage);

module.exports = router;
