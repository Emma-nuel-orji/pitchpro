document.addEventListener('DOMContentLoaded', () => {

    // Select all necessary elements from the DOM
    const form = document.getElementById('message-form');
    const input = document.getElementById('message-input');
    const messagesContainer = document.getElementById('messages');
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    // Load theme preference from localStorage
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    // Function to create and append a new message bubble
    const addMessage = (text, type) => {
        const messageEl = document.createElement('li');
        messageEl.classList.add('message', type);

        // Create the content div for the message
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        contentDiv.innerHTML = `<span class="message-text">${text}</span>`;
        messageEl.appendChild(contentDiv);

        messagesContainer.appendChild(messageEl);

        // Automatically scroll to the bottom of the chat
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    // Event listener for the form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the page from reloading
        const messageText = input.value.trim();

        if (messageText!== '') {
            addMessage(messageText, 'sender-message');
            input.value = ''; // Clear the input field

            // Simulate a bot response after a short delay
            setTimeout(() => {
                const botResponse = "Thank you for your question. A support agent will be with you shortly.";
                addMessage(botResponse, 'receiver-message');
            }, 1000);
        }
    });

    // Event listener for the theme toggle button
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Update the button text based on the current theme
        if (body.classList.contains('dark-mode')) {
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });
});