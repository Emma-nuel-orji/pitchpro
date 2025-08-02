document.addEventListener('DOMContentLoaded', () => {
    const codeInputs = document.querySelectorAll('.code-input');
    const resendLink = document.querySelector('.resend-text a');

    // Automatically move to the next input field
    codeInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            if (value && index < codeInputs.length - 1) {
                codeInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
                codeInputs[index - 1].focus();
            }
        });
    });

    // Resend code link functionality
    resendLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Resending verification code...');
        // In a real application, you would trigger a function here to resend the code via your server
    });

    // Focus on the first input field on page load for a better user experience
    if (codeInputs.length > 0) {
        codeInputs[0].focus();
    }
});