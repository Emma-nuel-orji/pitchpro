document.addEventListener('DOMContentLoaded', () => {
    const ageButtons = document.querySelectorAll('.age-button');

    ageButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const selectedAge = event.target.dataset.age;
            alert(`You selected: ${selectedAge}`);
            console.log(`User selected age category: ${selectedAge}`);

            // In a real application, you would add logic here:
            // - Redirect the user to the next page
            window.location.href = "notifications.html"; // or next screen
            // - Store the age category in local storage or a cookie
        });
    });
});