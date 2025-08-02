document.addEventListener('DOMContentLoaded', () => {
    // Handle clearing individual search items
    const clearButtons = document.querySelectorAll('.clear-search');

    clearButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const searchItem = e.target.closest('.search-item');
            if (searchItem) {
                searchItem.remove();
                console.log('Search item removed.');
            }
        });
    });

    // Handle bottom navigation active state (similar to clips-page.js)
    // const navItems = document.querySelectorAll('.bottom-nav-search .nav-item');
    // navItems.forEach(item => {
    //     item.addEventListener('click', (e) => {
    //         e.preventDefault();
    //         navItems.forEach(nav => nav.classList.remove('active'));
    //         item.classList.add('active');
    //         // In a real app, you would navigate to different pages here
    //         console.log('Nav item clicked');
    //     });
    // });

    // Optional: Add functionality for the search input (e.g., live search, submit on enter)
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', (e) => {
        console.log('Search input changed:', e.target.value);
        // In a real app, you would perform a search query here
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            console.log('Search submitted:', e.target.value);
            // In a real app, you would trigger a search results display
            e.target.blur(); // Hide keyboard on mobile
        }
    });
});