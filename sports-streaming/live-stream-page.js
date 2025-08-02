document.addEventListener('DOMContentLoaded', () => {
    const liveStreamCarousel = document.querySelector('.live-stream-carousel');
    const liveVideos = document.querySelectorAll('.live-video');
    const videoOverlays = document.querySelectorAll('.video-overlay');
    const playButtons = document.querySelectorAll('.play-button');
    const clipButtons = document.querySelectorAll('.clip-button');
    const clippingOverlays = document.querySelectorAll('.clipping-overlay');
    const recordingTimers = document.querySelectorAll('.recording-timer');
    const clippedSuccessOverlays = document.querySelectorAll('.clipped-success-overlay');
    const saveButtons = document.querySelectorAll('.save-btn');
    const postButtons = document.querySelectorAll('.post-btn');
    const readCommentsButtons = document.querySelectorAll('.read-comments-btn');
    const commentsOverlay = document.querySelector('.comments-overlay');
    const closeCommentsBtn = document.querySelector('.close-comments-btn');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    const scrollUpIndicator = document.querySelector('.scroll-up');
    const scrollDownIndicator = document.querySelector('.scroll-down');
    const bottomNavItems = document.querySelectorAll('.bottom-nav-main.nav-item');

    let currentStreamIndex = 0;
    let recordingInterval;
    let recordingTime = 0;
    const maxRecordingTime = 180; // 3 minutes in seconds

    // --- Video Playback & Vertical Scroll ---
    function playCurrentVideo() {
        liveVideos.forEach((video, index) => {
            if (index === currentStreamIndex) {
                video.play().catch(error => console.error("Video play failed:", error));
                videoOverlays[index].classList.add('playing');
            } else {
                video.pause();
                video.currentTime = 0; // Reset video when not active
                videoOverlays[index].classList.remove('playing');
            }
        });
    }

    // Initialize first video
    playCurrentVideo();

    liveStreamCarousel.addEventListener('scroll', () => {
        const scrollPosition = liveStreamCarousel.scrollTop;
        const slideHeight = liveStreamCarousel.clientHeight;
        const newIndex = Math.round(scrollPosition / slideHeight);

        if (newIndex!== currentStreamIndex) {
            currentStreamIndex = newIndex;
            playCurrentVideo();
        }

        // Show/hide scroll indicators based on scroll position
        clearTimeout(liveStreamCarousel.scrollTimeout);
        scrollUpIndicator.classList.add('visible');
        scrollDownIndicator.classList.add('visible');

        liveStreamCarousel.scrollTimeout = setTimeout(() => {
            scrollUpIndicator.classList.remove('visible');
            scrollDownIndicator.classList.remove('visible');
        }, 2000); // Hide after 2 seconds of no scrolling
    });

    // Initial check for scroll indicators (if content is scrollable)
    if (liveStreamCarousel.scrollHeight > liveStreamCarousel.clientHeight) {
        scrollDownIndicator.classList.add('visible'); // Show down arrow initially
    }

    // Play/Pause on video overlay click
    videoOverlays.forEach((overlay, index) => {
        overlay.addEventListener('click', () => {
            const video = liveVideos[index];
            if (video.paused) {
                video.play();
                overlay.classList.add('playing');
            } else {
                video.pause();
                overlay.classList.remove('playing');
            }
        });
    });

    // --- Clipping Functionality ---
    clipButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const currentClippingOverlay = clippingOverlays[index];
            const currentClippedSuccessOverlay = clippedSuccessOverlays[index];
            const currentRecordingTimer = recordingTimers[index];

            // Hide other overlays
            videoOverlays[index].classList.add('hidden');
            currentClippedSuccessOverlay.classList.add('hidden');

            // Show recording indicator
            currentClippingOverlay.classList.remove('hidden');
            recordingTime = 0;
            currentRecordingTimer.textContent = '00:00';

            // Simulate recording
            recordingInterval = setInterval(() => {
                recordingTime++;
                const minutes = Math.floor(recordingTime / 60).toString().padStart(2, '0');
                const seconds = (recordingTime % 60).toString().padStart(2, '0');
                currentRecordingTimer.textContent = `${minutes}:${seconds}`;

                if (recordingTime >= maxRecordingTime) {
                    clearInterval(recordingInterval);
                    currentClippingOverlay.classList.add('hidden');
                    currentClippedSuccessOverlay.classList.remove('hidden');
                    console.log("Clipping finished!");
                }
            }, 1000); // Update every second
        });
    });

    saveButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Video saved!');
            button.closest('.clipped-success-overlay').classList.add('hidden');
            // In a real app, trigger backend save
        });
    });

    postButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Video posted!');
            button.closest('.clipped-success-overlay').classList.add('hidden');
            // In a real app, trigger backend post
        });
    });

    // --- Comments Overlay Functionality ---
    readCommentsButtons.forEach(button => {
        button.addEventListener('click', () => {
            commentsOverlay.classList.add('active');
            // Pause current video when comments open
            liveVideos.pause();
            videoOverlays.classList.remove('playing');
        });
    });

    closeCommentsBtn.addEventListener('click', () => {
        commentsOverlay.classList.remove('active');
        // Resume video when comments close
        liveVideos.play();
        videoOverlays.classList.add('playing');
    });

    // Full screen button within comments
    fullscreenBtn.addEventListener('click', () => {
        const videoPlayerWrapper = liveVideos.closest('.video-player-wrapper');
        if (videoPlayerWrapper.requestFullscreen) {
            videoPlayerWrapper.requestFullscreen();
        } else if (videoPlayerWrapper.webkitRequestFullscreen) { /* Safari */
            videoPlayerWrapper.webkitRequestFullscreen();
        } else if (videoPlayerWrapper.msRequestFullscreen) { /* IE11 */
            videoPlayerWrapper.msRequestFullscreen();
        }
        // Add a class to manage full screen state in CSS
        videoPlayerWrapper.classList.add('fullscreen');
        commentsOverlay.classList.remove('active'); // Hide comments in fullscreen
    });

    // Exit fullscreen listener
    document.addEventListener('fullscreenchange', () => {
        const videoPlayerWrapper = document.querySelector('.video-player-wrapper.fullscreen');
        if (!document.fullscreenElement && videoPlayerWrapper) {
            videoPlayerWrapper.classList.remove('fullscreen');
            // Optionally, bring comments back if they were open before fullscreen
            // commentsOverlay.classList.add('active');
        }
    });


    // --- Bottom Navigation Active State ---
    bottomNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            bottomNavItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            // In a real app, you would navigate to different pages here based on data-nav-target
            console.log(`Nav item clicked: ${item.dataset.navTarget}`);
        });
    });
});