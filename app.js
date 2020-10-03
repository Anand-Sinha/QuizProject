//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const ejs = require("ejs");
const mongoose = require("mongoose");
const path = require("path");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//requiring local files
const viewRouter = require("./routes/viewRouter");
const quizRouter = require("./routes/quizRouter");
const globalErrorHandler = require("./controller/error");
const userRouter = require("./routes/userRouter");
const AppError = require("./utils/appError");

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//setting up the middleware for the static files
app.use(express.static(path.join(__dirname, "public")));

//Development loging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//BEFORE body-parser
app.post(
  "/webhook-checkout",
  bodyParser.raw({
    type: "application/json",
  })
);

// Body parser, reading data from body into req.body
app.use(
  express.json({
    limit: "10kb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  })
);
app.use(cookieParser());

//Test middleware
app.use((req, res, next) => {
  req.time = new Date().toISOString();
  console.log(req.cookies);
  next();
});

//setting up middleware for rendering home page
app.use("/", viewRouter);

//setting up the middleware for adding the questions
app.use("/api/quiz", quizRouter);

//setting up middleware for sign-up
app.use("/api/user", userRouter);

//route middleware for all the undefined routes
app.all("*", (req, res, next) => {
  next(
    new AppError(`Error: Cannot find ${req.originalUrl} on the server`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
