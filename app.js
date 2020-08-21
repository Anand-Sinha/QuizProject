//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const path = require("path");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//requiring local files
const quesRouter = require("./routes/quesRouter");
const viewRouter = require("./routes/viewRouter");
const addQuesRouter = require("./routes/addQuesRouter");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
//setting up the middleware for the static files
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(
  "mongodb+srv://admin-anand:Mongod123@cluster0-ut4en.mongodb.net/quesDB",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const userSchema = new mongoose.Schema ({
  email: String,
  password: String
});

const User = new mongoose.model("User", userSchema);

// login page
app.get("/",function(req,res){
  res.render("login");
});
app.post("/",function(req,res){
  console.log(req.body);
});
// registration page
app.get("/register",function(req,res){
  res.render("register");
});

app.post("/register",function(req,res){
  console.log(req.body);
});

app.get("/pp",function(req,res){
  res.render("privacy");
});
app.get("/tc",function(req,res){
  res.render("tc");
});
//setting up the middleware for questions
app.use("/api/v1/ques", quesRouter);

//setting up middleware for rendering home page
app.use("/home", viewRouter);

//setting up the middleware for adding the questions
app.use("/add", addQuesRouter);

app.listen(process.env.PORT || 3000, function () {
  console.log("Started...");
});
