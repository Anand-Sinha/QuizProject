//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb+srv://admin-anand:Mongod123@cluster0-ut4en.mongodb.net/quesDB',{ useNewUrlParser: true,useUnifiedTopology: true });

var quesSchema= new mongoose.Schema ({
  question:{
    type: String,
    required:true
  },
  answers:[
    {
      text:{
        type: String,
        required: true
      },
      correct:{
        type: Boolean,
        required: true
      }
    }
  ]
});

const Ques = mongoose.model("Ques",quesSchema);

var vals,ques1,a1=false,a2=false,a3=false,a4=false;

// console.log(ques1);

app.get("/", function(req,res){
  Ques.find({},function(err,results){
    vals=results;
    ques1 = JSON.stringify(vals);
    res.render("home", {
      questions: ques1
    });
  });
});

app.get("/add", function(req,res){
  res.render("addQues");
});

app.post("/add",function(req,res){
  console.log(req.body);
  const question = req.body.question;
  const option1 = req.body.answer1;
  const option2 = req.body.answer2;
  const option3 = req.body.answer3;
  const option4 = req.body.answer4;
  const ans = req.body.val;
  if (ans=="ans1") {
    a1=true;
  }
  else if (ans=="ans2") {
    a2=true;
  }
  else if (ans=="ans3") {
    a3=true;
  }
  else if (ans=="ans4") {
    a4=true;
  }
  const ques = new Ques({
    question:question,
    answers:[
      {
      text:option1,
      correct:a1
    },
    {
      text:option2,
      correct:a2
    },
    {
      text:option3,
      correct:a3
    },
    {
      text:option4,
      correct:a4
    }
    ]
  });
  // console.log(ques);
  ques.save(function(err,result){
    if(err){
      res.send("fail");
    }
    else{
      res.send("success");
    }
  });
});

app.listen(process.env.PORT||3000, function() {
  console.log("Started...");
});
