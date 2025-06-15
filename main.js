window.addEventListener('DOMContentLoaded', () => {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const submitBtn = document.getElementById('submitBtn');
  const successMessage = document.getElementById('successMessage');

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
      localStorage.clear();
      submitBtn.disabled = true;
    }
  });
});
