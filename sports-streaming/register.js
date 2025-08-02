document.addEventListener('DOMContentLoaded', () => {
    // 1. Populate Date of Birth Dropdowns
    const monthSelect = document.getElementById('month');
    const daySelect = document.getElementById('day');
    const yearSelect = document.getElementById('year');

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = month;
        monthSelect.appendChild(option);
    });

    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }

    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 100; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }

    // 2. Toggle Phone Number and Email Input
    const toggleLink = document.getElementById('toggle-contact-method');
    const phoneGroup = document.getElementById('phone-group');
    const emailGroup = document.getElementById('email-group');
    const phoneNumberLabel = document.querySelector('label[for="phone-number"]');

    toggleLink.addEventListener('click', (event) => {
        event.preventDefault();
        
        if (phoneGroup.classList.contains('hidden')) {
            // Currently showing email, switch to phone
            phoneGroup.classList.remove('hidden');
            emailGroup.classList.add('hidden');
            toggleLink.textContent = 'Use Email Instead';
            phoneNumberLabel.textContent = 'Phone number';
        } else {
            // Currently showing phone, switch to email
            phoneGroup.classList.add('hidden');
            emailGroup.classList.remove('hidden');
            toggleLink.textContent = 'Use Phone Number Instead';
            phoneNumberLabel.textContent = 'Email address';
        }
    });

    // 3. Toggle Password Visibility
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.querySelector('.password-toggle');

    passwordToggle.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle the eye icon
        if (type === 'password') {
            passwordToggle.classList.remove('fa-eye');
            passwordToggle.classList.add('fa-eye-slash');
        } else {
            passwordToggle.classList.remove('fa-eye-slash');
            passwordToggle.classList.add('fa-eye');
        }
    });
});
