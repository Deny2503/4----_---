window.addEventListener('DOMContentLoaded', () => {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const submitBtn = document.getElementById('submitBtn');
  const successMessage = document.getElementById('successMessage');

  const loginEmail = document.getElementById('loginEmail');
  const loginPassword = document.getElementById('loginPassword');
  const loginBtn = document.getElementById('loginBtn');
  const loginMessage = document.getElementById('loginMessage');

  let nameTouched = false;
  let emailTouched = false;
  let passTouched = false;
  let confirmTouched = false;

  function showError(input, message) {
    input.classList.add('error-input');
    document.getElementById(input.id + 'Error').textContent = message;
  }

  function clearError(input) {
    input.classList.remove('error-input');
    document.getElementById(input.id + 'Error').textContent = '';
  }

  function validateName() {
    if (!name.value.trim()) {
      showError(name, 'Поле не заповнене');
      return false;
    }
    if (name.value.length < 2) {
      showError(name, 'Мінімум 2 символи');
      return false;
    }
    clearError(name);
    return true;
  }

  function validateEmail() {
    if (!email.value.trim()) {
      showError(email, 'Поле не заповнене');
      return false;
    }
    const regex = /^\S+@\S+\.\S+$/;
    if (!regex.test(email.value)) {
      showError(email, 'Некоректний email');
      return false;
    }
    clearError(email);
    return true;
  }

  function validatePassword() {
    if (!password.value) {
      showError(password, 'Поле не заповнене');
      return false;
    }
    if (password.value.length < 6) {
      showError(password, 'Мінімум 6 символів');
      return false;
    }
    clearError(password);
    return true;
  }

  function validateConfirm() {
    if (!confirmPassword.value) {
      showError(confirmPassword, 'Поле не заповнене');
      return false;
    }
    if (confirmPassword.value !== password.value) {
      showError(confirmPassword, 'Паролі не збігаються');
      return false;
    }
    clearError(confirmPassword);
    return true;
  }

  function validateAll() {
    return validateName() && validateEmail() && validatePassword() && validateConfirm();
  }

  function updateErrors() {
    if (nameTouched) validateName();
    if (emailTouched) validateEmail();
    if (passTouched) validatePassword();
    if (confirmTouched) validateConfirm();

    submitBtn.disabled = !validateAll();
  }

  function restoreForm() {
    name.value = localStorage.getItem('name') || '';
    email.value = localStorage.getItem('email') || '';
    password.value = localStorage.getItem('password') || '';
    confirmPassword.value = localStorage.getItem('confirmPassword') || '';

    nameTouched = localStorage.getItem('touched_name') === 'true';
    emailTouched = localStorage.getItem('touched_email') === 'true';
    passTouched = localStorage.getItem('touched_password') === 'true';
    confirmTouched = localStorage.getItem('touched_confirmPassword') === 'true';

    updateErrors();
    submitBtn.disabled = false;
  }

  function setupInput(input, key, touchedVarSetter) {
    input.addEventListener('input', () => {
      touchedVarSetter(true);
      localStorage.setItem(input.id, input.value);
      localStorage.setItem('touched_' + key, 'true');
      updateErrors();
    });
  }

  setupInput(name, 'name', val => nameTouched = val);
  setupInput(email, 'email', val => emailTouched = val);
  setupInput(password, 'password', val => passTouched = val);
  setupInput(confirmPassword, 'confirmPassword', val => confirmTouched = val);

  restoreForm();

  document.getElementById('regForm').addEventListener('submit', function (e) {
    e.preventDefault();
    nameTouched = true;
    emailTouched = true;
    passTouched = true;
    confirmTouched = true;
    updateErrors();

    if (validateAll()) {
      successMessage.textContent = 'Успішна реєстрація!';
      localStorage.setItem('reg_email', email.value);
      localStorage.setItem('reg_password', password.value);
      submitBtn.disabled = true;
    }
  });

  function validateLoginEmail() {
    const val = loginEmail.value.trim();
    const regex = /^\S+@\S+\.\S+$/;
    if (!val) {
      showError(loginEmail, 'Поле не заповнене');
      return false;
    }
    if (!regex.test(val)) {
      showError(loginEmail, 'Некоректний email');
      return false;
    }

    clearError(loginEmail);
    return true;
  }

  function validateLoginPassword() {
    const val = loginPassword.value;
    if (!val) {
      showError(loginPassword, 'Поле не заповнене');
      return false;
    }
    if (val.length < 6) {
      showError(loginPassword, 'Мінімум 6 символів');
      return false;
    }
    clearError(loginPassword);
    return true;
  }

  function updateLoginBtn() {
    const valid = validateLoginEmail() & validateLoginPassword();
    loginBtn.disabled = !valid;
  }

  loginEmail.addEventListener('input', updateLoginBtn);
  loginPassword.addEventListener('input', updateLoginBtn);

  document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const valid = validateLoginEmail() && validateLoginPassword();
    if (!valid) return;

    const storedEmail = localStorage.getItem('reg_email');
    const storedPassword = localStorage.getItem('reg_password');

    if (
      loginEmail.value === storedEmail &&
      loginPassword.value === storedPassword
    ) {
      loginMessage.textContent = 'Вхід успішний!';
      loginMessage.style.color = 'green';
    } else {
      loginMessage.textContent = 'Невірний email або пароль.';
      loginMessage.style.color = 'red';
    }
  });
});
