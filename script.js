const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  formControl.querySelector("small").innerText = message;
}

// Show success outline
function showSuccess(input) {
  input.parentElement.className = "form-control success";
}

// Check email is valid
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(email.value.trim())) {
    showSuccess(email);
  } else {
    showError(email, "Email is not valid");
  }
}

// Capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Password match
function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Password do not match");
  }
}

// Check required field
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${capitalizeFirstLetter(input.id)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${capitalizeFirstLetter(input.id)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${capitalizeFirstLetter(input.id)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

// Event listners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  validateEmail(email);
  checkPasswordMatch(password, password2);
});
