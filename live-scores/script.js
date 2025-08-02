document.addEventListener('DOMContentLoaded', () => {
    // Select all main content areas
    const mainContents = document.querySelectorAll('.app-container > main');
    // Select all bottom navigation items
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');

    // Function to show a specific page and update active navigation
    function showPage(pageId) {
        // Hide all main content sections
        mainContents.forEach(content => {
            content.classList.add('hidden');
        });

        // Show the selected main content section
        const activeContent = document.querySelector(`.main-content[data-page="${pageId}"]`);
        if (activeContent) {
            activeContent.classList.remove('hidden');
        }

        // Update active class on bottom navigation
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === pageId) {
                item.classList.add('active');
            }
        });

        // Optional: Scroll to top of the content when switching pages
        // window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Set initial active page (e.g., "live-score")
    // When the page loads, we want to show the 'live-score' content by default
    // and make its nav item active.
    showPage('live-score'); // Default to Live Score on load

    // Add click event listeners for bottom navigation items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior (page reload)
            const pageToLoad = item.dataset.page;
            showPage(pageToLoad);
            console.log(`${pageToLoad} page selected`);
        });
    });


    // --- Existing JavaScript from previous pages (keep this as well) ---

    // Make date and sport filters scroll to active item on load
    const dateNav = document.querySelector('.date-nav');
    const activeDateItem = document.querySelector('.date-item.active');
    if (activeDateItem) {
        // Scroll active date item into view
        dateNav.scrollLeft = activeDateItem.offsetLeft - (dateNav.offsetWidth / 2) + (activeDateItem.offsetWidth / 2);
    }

    const sportFilters = document.querySelector('.sport-filters');
    const activeSportFilter = document.querySelector('.filter-btn.active');
    if (activeSportFilter) {
        // Scroll active sport filter into view
        sportFilters.scrollLeft = activeSportFilter.offsetLeft - (sportFilters.offsetWidth / 2) + (activeSportFilter.offsetWidth / 2);
    }

    // Add click functionality for filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            button.classList.add('active');
            console.log(`${button.textContent} filter clicked`);
        });
    });

    // Add click functionality for date items
    const dateItems = document.querySelectorAll('.date-item');
    dateItems.forEach(item => {
        item.addEventListener('click', () => {
            dateItems.forEach(di => di.classList.remove('active'));
            item.classList.add('active');
            console.log(`Date ${item.querySelector('span').textContent} selected`);
        });
    });

    // Basic favorite icon toggle on Live Score page
    const liveScoreFavoriteIcons = document.querySelectorAll('.match-card .favorite-icon');
    liveScoreFavoriteIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            icon.classList.toggle('fa-solid'); // Toggles filled heart
            icon.classList.toggle('fa-regular'); // Toggles outline heart
            icon.classList.toggle('favorited'); // Add a class to apply specific color if needed
            console.log('Live score match favorite toggled');
        });
    });

    // Note: The favorite heart on the 'Favorite' page is always solid (fa-solid)
    // as it represents an already favorited item.
});















// document.addEventListener('DOMContentLoaded', () => {
//     // Make date and sport filters scroll to active item on load
//     const dateNav = document.querySelector('.date-nav');
//     const activeDateItem = document.querySelector('.date-item.active');
//     if (activeDateItem) {
//         // Scroll active date item into view
//         dateNav.scrollLeft = activeDateItem.offsetLeft - (dateNav.offsetWidth / 2) + (activeDateItem.offsetWidth / 2);
//     }

//     const sportFilters = document.querySelector('.sport-filters');
//     const activeSportFilter = document.querySelector('.filter-btn.active');
//     if (activeSportFilter) {
//         // Scroll active sport filter into view
//         sportFilters.scrollLeft = activeSportFilter.offsetLeft - (sportFilters.offsetWidth / 2) + (activeSportFilter.offsetWidth / 2);
//     }

//     // Add click functionality for filter buttons
//     const filterButtons = document.querySelectorAll('.filter-btn');
//     filterButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             // Remove active class from all filter buttons
//             filterButtons.forEach(btn => btn.classList.remove('active'));
//             // Add active class to the clicked button
//             button.classList.add('active');
//             // You can add logic here to filter content based on the clicked button
//             console.log(`${button.textContent} filter clicked`);
//         });
//     });

//     // Add click functionality for date items
//     const dateItems = document.querySelectorAll('.date-item');
//     dateItems.forEach(item => {
//         item.addEventListener('click', () => {
//             dateItems.forEach(di => di.classList.remove('active'));
//             item.classList.add('active');
//             console.log(`Date ${item.querySelector('span').textContent} selected`);
//             // You can add logic here to load matches for the selected date
//         });
//     });

//     // Handle bottom navigation (though this page is 'Live score' already active)
//     const navItems = document.querySelectorAll('.bottom-nav .nav-item');
//     navItems.forEach(item => {
//         item.addEventListener('click', (e) => {
//             // Prevent default link behavior if you're handling routing client-side
//             e.preventDefault();
//             navItems.forEach(ni => ni.classList.remove('active'));
//             item.classList.add('active');
//             console.log(`${item.querySelector('.nav-text').textContent} selected`);
//             // In a real app, you'd load the content for 'News' or 'Favorite' here
//         });
//     });

//     // Basic favorite icon toggle
//     const favoriteIcons = document.querySelectorAll('.favorite-icon');
//     favoriteIcons.forEach(icon => {
//         icon.addEventListener('click', () => {
//             icon.classList.toggle('fa-solid'); // Toggles filled heart
//             icon.classList.toggle('fa-regular'); // Toggles outline heart
//             icon.classList.toggle('favorited'); // Add a class to apply specific color if needed
//             console.log('Favorite toggled');
//         });
//     });
// });








// // Scrollable date selection
// document.querySelectorAll(".date").forEach(date => {
//   date.addEventListener("click", () => {
//     document.querySelectorAll(".date").forEach(d => d.classList.remove("selected"));
//     date.classList.add("selected");
//   });
// });

// // Sports pill toggle
// document.querySelectorAll(".pill").forEach(pill => {
//   pill.addEventListener("click", () => {
//     document.querySelectorAll(".pill").forEach(p => p.classList.remove("selected"));
//     pill.classList.add("selected");
//   });
// });

// // Bottom nav tab switching (logic placeholder)
// document.querySelectorAll(".nav-item").forEach(nav => {
//   nav.addEventListener("click", () => {
//     document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
//     nav.classList.add("active");
//     alert(`Switching to: ${nav.textContent.trim()}`);
//   });
// });