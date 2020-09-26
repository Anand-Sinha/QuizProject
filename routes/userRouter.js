const express = require("express");
const authController = require("../controller/authenticationController");

//creating a router
const router = express.Router();

router.post("/sign-up", authController.signUp);
router.post("/login", authController.login);
router.post("/oauth-sign-up", authController.oauthSignUp);
router.post("/oauth-login", authController.oauthLogin);
router.route("/logout").get(authController.logout);

module.exports = router;
