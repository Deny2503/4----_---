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
        if (!name.value.trim()) return 'Поле не заповнене';
        if (name.value.length < 2) return 'Мінімум 2 символи';
        return '';
    }

    function validateEmail() {
        if (!email.value.trim()) return 'Поле не заповнене';
        const regex = /^\S+@\S+\.\S+$/;
        if (!regex.test(email.value)) return 'Некоректний email';
        return '';
    }

    function validatePassword() {
        if (!password.value) return 'Поле не заповнене';
        if (password.value.length < 6) return 'Мінімум 6 символів';
        return '';
    }

    function validateConfirm() {
        if (!confirmPassword.value) return 'Поле не заповнене';
        if (confirmPassword.value !== password.value) return 'Паролі не збігаються';
        return '';
    }

    function validateAll() {
        return (
            validateName() === '' &&
            validateEmail() === '' &&
            validatePassword() === '' &&
            validateConfirm() === ''
        );
    }

    function updateErrors() {
        if (nameTouched) {
            const msg = validateName();
            if (msg !== '') showError(name, msg);
            else clearError(name);
        }

        if (emailTouched) {
            const msg = validateEmail();
            if (msg !== '') showError(email, msg);
            else clearError(email);
        }

        if (passTouched) {
            const msg = validatePassword();
            if (msg !== '') showError(password, msg);
            else clearError(password);
        }

        if (confirmTouched) {
            const msg = validateConfirm();
            if (msg !== '') showError(confirmPassword, msg);
            else clearError(confirmPassword);
        }
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
