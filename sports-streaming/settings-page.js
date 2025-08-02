document.addEventListener('DOMContentLoaded', () => {
    const settingsListItems = document.querySelectorAll('.settings-list .list-item');
    const navItems = document.querySelectorAll('.bottom-nav-settings .nav-item');

    // Handle clicks on settings list items
    settingsListItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const action = e.currentTarget.dataset.action;
            
            switch (action) {
                case 'fund':
                    alert('Navigating to Fund your account page...');
                    // In a real app, you would redirect to the funding page
                    break;
                case 'clear-history':
                    if (confirm('Are you sure you want to clear your search history?')) {
                        alert('Search history cleared!');
                        // In a real app, you would send a request to clear history
                    }
                    break;
                case 'subscription':
                    alert('Navigating to Subscription management...');
                    // In a real app, you would redirect to the subscription page
                    break;
                case 'logout':
                    if (confirm('Are you sure you want to log out?')) {
                        alert('You have been logged out.');
                        // In a real app, you would clear the user session and redirect to the login page
                    }
                    break;
                default:
                    console.log(`Action for ${action} not defined.`);
            }
        });
    });

    // Handle bottom navigation active state
    // navItems.forEach(item => {
    //     item.addEventListener('click', (e) => {
    //         e.preventDefault();
    //         navItems.forEach(nav => nav.classList.remove('active'));
    //         item.classList.add('active');
    //         // In a real app, you would navigate to different pages here
    //         console.log('Nav item clicked');
    //     });
    // });
});