const form = document.getElementById('form');
const password1El = document.getElementById('password1');
const password2El = document.getElementById('password2');
const messageContainer = document.querySelector('.message-container');
const message = document.getElementById('message');

let isValid = false;
let passwordsMatch = false;

function setMessage(text, color) {
  message.textContent = text;
  message.style.color = color;
  messageContainer.style.borderColor = color;
}

function setPasswordBorder(color) {
  password1El.style.borderColor = color;
  password2El.style.borderColor = color;
}

function validateForm() {
  isValid = form.checkValidity();
  passwordsMatch = password1El.value === password2El.value;
  // Form Valid ?
  if (!isValid) {
    setMessage('Please fill out all fields.', 'red');
    return;
  }
  // Passwords Match ?
  if (!passwordsMatch) {
    setMessage('Make sure passwords match.', 'red');
    setPasswordBorder('red');
    return;
  }
  // Form Valid + Passwords Match
  setPasswordBorder('green');
  setMessage('Successfully Registered!', 'green');
}

function storeFormData() {
  const user = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    website: form.website.value,
    password: form.password.value
  }
  console.log(user);
}

function processFormData(e) {
  e.preventDefault();
  validateForm();
  if (isValid && passwordsMatch) storeFormData();
}

// Event Listener
form.addEventListener('submit', processFormData);