const form = document.getElementById('regForm');
const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');

const errorMap = {
    name: document.getElementById('nameError'),
    email: document.getElementById('emailError'),
    password: document.getElementById('passwordError'),
    confirmPassword: document.getElementById('confirmError'),
};

function showError(input, message) {
    input.classList.add('error-input');
    errorMap[input.id].textContent = message;
}

function clearError(input) {
    input.classList.remove('error-input');
    errorMap[input.id].textContent = '';
}

function validate() {
    let isValid = true;

    [name, email, password, confirmPassword].forEach(clearError);
    successMessage.textContent = '';

    if (name.value.trim().length < 2) {
        showError(name, 'Мінімум 2 символи');
        isValid = false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
        showError(email, 'Некоректний email');
        isValid = false;
    }

    if (password.value.length < 6) {
        showError(password, 'Мінімум 6 символів');
        isValid = false;
    }

    if (password.value !== confirmPassword.value || confirmPassword.value === '') {
        showError(confirmPassword, 'Паролі не збігаються');
        isValid = false;
    }

    return isValid;
}

form.addEventListener('input', function () {
    submitBtn.disabled = !validate();
});

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (validate()) {
        successMessage.textContent = 'Успішна реєстрація!';
        form.reset();
        submitBtn.disabled = true;
        [name, email, password, confirmPassword].forEach(clearError);
    }
});
