const signUpForm = document.querySelector(".sign-up");
const signUpButton = document.querySelector(".submit-button");
const name = document.querySelector(".name").value;
const email = document.querySelector(".email").value;
const password = document.querySelector(".password").value;
const confirmPassword = document.querySelector(".confirm-password").value;

signUpButton.addEventListener("click", () => {
  console.log("form is submitted!!");
});
