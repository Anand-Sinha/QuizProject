//jshint esversion:8
// import axios from "axios";

// const { default: Axios } = require("axios");

// adding quiz
const quizForm = document.getElementById("quiz");
const addQueBtn = document.getElementById("addQue");
const addQuizBtn = document.getElementById("addQuiz");

var optNo = 2;
// questions array
let questions = [];

const addQuestion = () => {
  console.log("question is added");
  const answers = [];

  const questionText = document.querySelector(".question").value;

  for(var i=1; i <= optNo ; i++){
    let option = document.querySelector(".answer"+i).value;
    let correct = document.getElementById("answer"+i).checked ? true : false;
    answers.push({ option, correct });
  }

  console.log(answers);
  console.log({ questionText, answers });
  questions.push({ questionText, answers });

  for(i=1; i <= optNo ; i++){
      document.querySelector(".answer"+i).value = "";
  }
  document.querySelector(".question").value = "";
  optNo = 2;
  $(".toRemove").remove();
};

const submitQuiz = async () => {
  const quizName = document.querySelector(".name").value;
  if (quizName === "") {
    alert("Quiz must have a name.");
    return;
  }

  if (questions.length === 0) {
    alert("Quiz must contain questions.");
    return;
  }

  let cookie = document.cookie;
  cookie = cookie.split("").slice(12, 36).join("");

  console.log({ quizName, questions, cookie });

  try {
    const result = await axios({
      method: "POST",
      url: "../api/quiz",
      data: {
        quizName,
        question: questions,
        user: cookie,
      },
    });

    console.log(result);
    if (result.data.status === "Success") {
      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
};

//adding the questions
addQueBtn.addEventListener("click", addQuestion);

document.addEventListener("keypress", function (event) {
  if (event.keyCode === 13 || event.which === 13) {
    addQuestion();
  }
});

$(".addOption").click(function(){
  optNo = optNo + 1;
  $(".options").append('<input type="text" name="answer'+ optNo +'" class="answer'+ optNo +' answer toRemove" value="" placeholder="Option ' + optNo + '"> <input type="radio" id="answer' + optNo + '" class="toRemove" name="val" value="ans' + optNo + '">');
});

addQuizBtn.addEventListener("click", submitQuiz);
