document.addEventListener('DOMContentLoaded', () => {
    // --- Carousel functionality ---
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const slideCount = slides.length;
    let currentSlide = 0;

    function moveToNextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        const offset = -currentSlide * 100 / slideCount;
        carouselTrack.style.transform = `translateX(${offset}%)`;
    }

    // Set a timer for infinite carousel loop
    setInterval(moveToNextSlide, 5000); // Change slide every 5 seconds

    // --- Sport Filters Active State ---
    const filterButtons = document.querySelectorAll('.sport-filters .filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            console.log(`Filter selected: ${button.textContent}`);
            // In a real app, you would filter the content on the page here
        });
    });

    // --- Bottom Navigation Active State ---
    // const navItems = document.querySelectorAll('.bottom-nav-clips .nav-item');
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