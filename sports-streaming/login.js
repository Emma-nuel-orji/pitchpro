document.addEventListener('DOMContentLoaded', () => {
    // Toggle Password Visibility
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.querySelector('.password-toggle');

    if (passwordToggle) {
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
    }

    // Handle "Next" button click
    // const nextButton = document.querySelector('.next-btn');
    // if (nextButton) {
    //     nextButton.addEventListener('click', (e) => {
    //         e.preventDefault();
    //         const username = document.getElementById('username').value;
    //         const password = document.getElementById('password').value;

    //         if (username && password) {
    //             alert(`Attempting to sign in with Username: ${username}`);
    //             console.log('Sign in attempt:', { username, password });
    //             // In a real app, you would send this data to your server for authentication
    //         } else {
    //             alert('Please enter your username and password.');
    //         }
    //     });
    // }
});