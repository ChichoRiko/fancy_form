//!Questions Array
const questions = [
  { question: "What is your name?" },
  { question: "Are you addicted to Drum & Bass?" },
  { question: "What is your favorite track?" },
  { question: "What is the best party/rave you have ever attended?" },
  { question: "Who is your favorite DJ?" },
  { question: "What kind of drugs are you on?" },
  {
    question: "Enter your Email for more dnb related shit",
    type: "email",
    pattern: /\S+@\S+\.\S+/,
  },
  { question: "Type in the secret code for a chance to win", type: "password" },
];

//!Transition Times
const shakeTime = 100; //? Shake Transition Time
const switchTime = 200; //? Transition Between Questions

//!Init Question
let position = 0;

//! Init DOM
const formBox = document.querySelector("#form-box");
const nextBtn = document.querySelector("#next-btn");
const prevBtn = document.querySelector("#prev-btn");
const inputGroup = document.querySelector("#input-group");
const inputField = document.querySelector("#input-field");
const inputLabel = document.querySelector("#input-label");
const inputProgress = document.querySelector("#input-progress");
const progress = document.querySelector("#progress-bar");

//!Events
//? Get question on DOM load
document.addEventListener("DOMContentLoaded", getQuestion);

//? Next Button Click
nextBtn.addEventListener("click", validate);

//!Input Field Click
inputField.addEventListener("keyup", (e) => {
  if (e.keyCode == 13) {
    validate();
  }
});

//!Functions

function getQuestion() {
  inputLabel.innerHTML = questions[position].question;
  inputField.type = questions[position].type || "text";
  inputField.value = questions[position].answer || "";
  inputField.focus();

  //!Set Progress Bar

  progress.style.width = (position * 100) / questions.length + "%";

  //!add user icon or back arrow
  prevBtn.className = position ? "fas fa-arrow-left" : "fas fa-user";

  showQuestion();
}

//! Display Question to USer

function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = "";
  inputProgress.style.width = "100%";
}

//! hIDE question from user

function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = 'none';
  inputGroup.style.border = null;
}
//!Transform to create shake motion

function transform(x, y) {
    console.log(x, y);
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

//!Validate Field Value, Make sure that the field is not empty and if it matches patters when there is one

function validate() {
  if (!inputField.value.match(questions[position].pattern || /.+/)) {
    inputFail();
  } else {
    inputPass();
  }
}

//!field input pass and fail

function inputFail() {
  formBox.className = "error";
  //!Repeat shake motion as a loop
  for (let i = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0);
    inputField.focus();
  }
}
function inputPass() {
  formBox.className = "";
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  //!Increment position

  position++;
  //? If new question, hide current question and get next

  if (questions[position]) {
    hideQuestion();
    getQuestion();
  } else {

    //! Remove if no more questions

    hideQuestion();
    formBox.className = 'close';
    progress.style.width = '100%';

    //! Form Complete

    formComplete();
  }
}
