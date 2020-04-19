const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// show input error message
function showError(username, message) {
  const formControl = username.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}
// show input success message
function showSuccess(username, message) {
  const formControl = username.parentElement;
  formControl.className = 'form-control success';
}

function isEmailValid(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkRequired(inputArray) {
  let success = true;
  inputArray.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`)
      success = success && false;
    }
    else {
      showSuccess(input);
    }
  });
  return success;
}


function checkLength(input, min, max) {
  let success = true;
  if ((input.value.length < min) || (input.value.length > max)) {
    showError(input, `${getFieldName(input)} must be between ${min} and ${max} characters`)
    success = false;
  }
  else {
    showSuccess(input);
  }
  return success;
}

function checkEmail(input) {
  let success = true;
  if (!isEmailValid(input.value)) {
    showError(input, `${getFieldName(input)} is not valid`)
    success = false;
  }
  else {
    showSuccess(input);
  }
  return success;
}

function checkPasswordsMatch(input1, input2) {
  let success = true;
  if (input1.value !== input2.value) {
    showError(input2, `Passwords don't match`)
    success = false;
  }
  else {
    showSuccess(input2);
  }
  return success;
}

// Events listeners
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (checkRequired([username, email, password, password2]) &&
    checkLength(username, 3, 15) &&
    checkLength(password, 3, 15) &&
    checkEmail(email) &&
    checkPasswordsMatch(password, password2)) {
    console.log('submitted!!');
  }
  else {
    console.log('not submitted!!')
  }
})