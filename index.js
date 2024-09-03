const form = document.getElementById('form');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const phoneNumber = document.getElementById('phone-number');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

const formValues = []

const formFields = {
  firstName: null,
  lastName: null,
  email: null,
  phoneNumber: null,
  password: null,
  confirmPassword: null,
};

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-inputs error';
  let small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-inputs success';
}

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if (re.test(input.value.trim())) {
    showSuccess(input);
    formFields.email = true;
  } else {
    showError(input, 'Email is not valid');
    formFields.email = false;
  }
}

function checkRequired(inputArr) {
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
      formFields[input.name] = false;
    } else {
      showSuccess(input);
      formFields[input.name] = true;
    }
  });
}

function checkPasswordMatch(password, confirmPassword) {
  if (password.value !== confirmPassword.value) {
    showError(confirmPassword, 'Passwords do not match');
    formFields.confirmPassword = false;
  } else {
    showSuccess(confirmPassword);
    formFields.confirmPassword = true;
  }
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    formFields[input.name] = false;
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    formFields[input.name] = false;
  } else {
    showSuccess(input);
    formFields[input.name] = true;
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1).replace('-', ' ');
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  checkRequired([firstName, lastName, email, phoneNumber, password, confirmPassword]);
  checkLength(firstName, 2, 25);
  checkLength(lastName, 2, 25);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, confirmPassword);

  form.reset();

  alert('form submitted successfully')
  
});
