import { getQuestion } from "./getQuestions";

// import axios from "axios";

const startBtn = document.querySelector(".start-btn");
const nextBtn = document.querySelector(".next__btn");
const resultBtn = document.querySelector(".result-btn");
const mainContainer = document.querySelector(".main");
const questionText = document.querySelector(".question__text");
const answerBtnsContainer = document.querySelector(".answer__container");
const scoreElement = document.querySelector(".score");
const countDown = document.querySelector(".count-down");

// variables
let shuffleQuestionsArray, currentQuesIndex;
let score = 0;
let previousScore = 0;
let countDownDate;
var flag = 0;
let questions = [];

// On the load of the window
window.addEventListener("load", async () => {
  questions = await getQuestion();
});

function beginCountdown() {
  var x = setInterval(() => {
    if (flag == 1) {
      countDown.innerHTML = " ";
      clearInterval(x);
    } else {
      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element
      countDown.innerHTML =
        days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        countDown.innerHTML = "EXPIRED";
        showResults();
      }
    }
  }, 1000);
}

const startGame = () => {
  countDownDate = new Date(Date.now() + 120 * 1000).getTime();
  startBtn.classList.add("hide");
  mainContainer.classList.remove("hide");
  shuffleQuestionsArray = questions.sort(() => Math.random() - 0.5);
  currentQuesIndex = 0;
  beginCountdown();
  selectNextQue();
};

const selectNextQue = () => {
  resetState();
  showQuestion(shuffleQuestionsArray[currentQuesIndex]);
};

function resetState() {
  score += previousScore;
  previousScore = 0;
  console.log(`Score:- ${score}`);
  nextBtn.classList.add("hide");
  while (answerBtnsContainer.firstChild) {
    answerBtnsContainer.removeChild(answerBtnsContainer.firstChild);
  }
}

function showQuestion(question) {
  questionText.textContent = `Que) ${question.question}`;
  question.answers.forEach((el) => {
    const button = document.createElement("button");
    button.innerText = el.text;
    button.classList.add("btn");
    button.classList.add("answer__btn");
    if (el.correct) {
      button.dataset.correct = el.correct;
    }
    answerBtnsContainer.appendChild(button);
    button.addEventListener("click", selectAnswer);
  });
}

const selectAnswer = (e) => {
  const selectedAnswerBtn = e.target;
  //   console.log(selectedAnswerBtn);
  const correct = selectedAnswerBtn.dataset.correct;
  console.log(correct);
  Array.from(answerBtnsContainer.children).forEach((btn) => {
    if (btn.classList.contains("selected-answer")) {
      btn.classList.remove("selected-answer");
    }
  });
  selectedAnswerBtn.classList.add("selected-answer");
  if (shuffleQuestionsArray.length > currentQuesIndex + 1) {
    nextBtn.classList.remove("hide");
  } else {
    nextBtn.classList.remove("hide");
    nextBtn.innerText = "Show results";
  }

  if (correct === "true") {
    previousScore += 1;
  } else {
    previousScore = 0;
  }
  console.log(`PrevScore:- ${previousScore}`);
};

function showResults() {
  score += previousScore;
  //   console.log(`Final Score:- ${score}`);
  mainContainer.classList.add("hide");
  scoreElement.classList.remove("hide");
  scoreElement.innerText = `Score:- ${score}`;
  flag = 1;
}

// Event listeners
$("#start-btn").hover(function () {
  console.log(qsn);
});
startBtn.addEventListener("click", () => {
  console.log("Start button is clicked");
  startGame();
});
nextBtn.addEventListener("click", () => {
  if (shuffleQuestionsArray.length > currentQuesIndex + 1) {
    currentQuesIndex += 1;
    selectNextQue();
  } else {
    showResults();
  }
});
