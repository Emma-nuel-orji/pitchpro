document.addEventListener('DOMContentLoaded', () => {
    const videoFeedCarousel = document.querySelector('.video-feed-carousel');
    const videoSlides = document.querySelectorAll('.video-slide');
    const feedVideos = document.querySelectorAll('.feed-video');
    const videoOverlays = document.querySelectorAll('.video-overlay');
    const heartActionItems = document.querySelectorAll('.heart-action-item');
    const heartIcons = document.querySelectorAll('.heart-icon');
    const commentActionItems = document.querySelectorAll('.comment-action-item');
    const shareActionItems = document.querySelectorAll('.share-action-item');
    const topNavLinks = document.querySelectorAll('.top-nav-tiktok.top-nav-link');
    const bottomNavItems = document.querySelectorAll('.bottom-nav-tiktok.nav-item');

    const commentsOverlay = document.querySelector('.comments-overlay');
    const closeCommentsBtn = commentsOverlay.querySelector('.close-comments-btn');
    const commentInput = commentsOverlay.querySelector('.comment-input-area input');
    const sendCommentBtn = commentsOverlay.querySelector('.comment-input-area button');
    const commentsList = commentsOverlay.querySelector('.comments-list');


    let currentVideoIndex = 0;
    let lastTapTime = 0;
    const DOUBLE_TAP_THRESHOLD = 300; // milliseconds

    // --- Video Playback & Vertical Scroll ---
    function playCurrentVideo() {
        feedVideos.forEach((video, index) => {
            if (index === currentVideoIndex) {
                // Try to play with sound
                const playPromise = video.play();

                if (playPromise!== undefined) {
                    playPromise.then(() => {
                        // Playback started successfully (possibly with sound if allowed)
                        videoOverlays[index].classList.remove('paused');
                        video.classList.remove('muted'); // Hide volume icon
                    }).catch(error => {
                        // Autoplay was prevented, so try to play muted
                        video.muted = true;
                        video.play();
                        videoOverlays[index].classList.remove('paused');
                        video.classList.add('muted'); // Show volume icon
                    });
                }
            } else {
                video.pause();
                video.currentTime = 0;
                videoOverlays[index].classList.add('paused');
                video.classList.add('muted');
            }
        });
    }

    // Initialize first video
    playCurrentVideo();

    videoFeedCarousel.addEventListener('scroll', () => {
        const scrollPosition = videoFeedCarousel.scrollTop;
        const slideHeight = videoFeedCarousel.clientHeight;
        const newIndex = Math.round(scrollPosition / slideHeight);

        if (newIndex!== currentVideoIndex) {
            currentVideoIndex = newIndex;
            playCurrentVideo();
        }
    });

    // --- Single Tap (Play/Pause) & Double Tap (Like) ---
    videoOverlays.forEach((overlay, index) => {
        overlay.addEventListener('click', (event) => {
            const currentTime = new Date().getTime();
            const video = feedVideos[index];
            const heartIcon = heartIcons[index];
            const heartAnimationContainer = videoSlides[index].querySelector('.heart-animation-container');

            // Toggle mute on single tap if video is already playing
            if (!video.paused && (currentTime - lastTapTime > DOUBLE_TAP_THRESHOLD)) {
                video.muted =!video.muted;
                video.classList.toggle('muted', video.muted); // Show/hide volume icon
            }

            if (currentTime - lastTapTime < DOUBLE_TAP_THRESHOLD) {
                // Double tap detected
                console.log('Double tap - Like!');

                // Add liked class to static heart icon
                heartIcon.classList.add('liked');
                heartIcon.classList.remove('fa-regular');
                heartIcon.classList.add('fa-solid');

                // Create and animate bubbling heart
                const animatedHeart = document.createElement('i');
                animatedHeart.classList.add('fa-solid', 'fa-heart', 'animated-heart');
                animatedHeart.style.left = `${event.clientX - overlay.getBoundingClientRect().left}px`;
                animatedHeart.style.top = `${event.clientY - overlay.getBoundingClientRect().top}px`;
                heartAnimationContainer.appendChild(animatedHeart);

                // Remove heart after animation
                animatedHeart.addEventListener('animationend', () => {
                    animatedHeart.remove();
                });

                // Prevent single tap from also triggering play/pause
                event.stopPropagation();
            } else {
                // Single tap detected (for play/pause)
                if (video.paused) {
                    video.play();
                    overlay.classList.remove('paused');
                } else {
                    video.pause();
                    overlay.classList.add('paused');
                }
            }
            lastTapTime = currentTime;
        });
    });

    // --- Static Heart Icon Click ---
    heartActionItems.forEach(item => {
        const heartIcon = item.querySelector('.heart-icon');
        heartIcon.addEventListener('click', () => {
            heartIcon.classList.toggle('liked');
            if (heartIcon.classList.contains('liked')) {
                heartIcon.classList.remove('fa-regular');
                heartIcon.classList.add('fa-solid');
            } else {
                heartIcon.classList.remove('fa-solid');
                heartIcon.classList.add('fa-regular');
            }
            console.log('Static heart icon clicked!');
        });
    });

    // --- Comments Overlay Functionality ---
    commentActionItems.forEach(item => {
        item.addEventListener('click', () => {
            commentsOverlay.classList.remove('hidden');
            setTimeout(() => {
                commentsOverlay.classList.add('active');
            }, 10);
            
            feedVideos[currentVideoIndex].pause();
            videoOverlays[currentVideoIndex].classList.add('paused');
            console.log('Comments icon clicked - overlay opening');
        });
    });

    closeCommentsBtn.addEventListener('click', () => {
        commentsOverlay.classList.remove('active');
        setTimeout(() => {
            commentsOverlay.classList.add('hidden');
        }, 300);
        
        feedVideos[currentVideoIndex].play();
        videoOverlays[currentVideoIndex].classList.remove('paused');
        console.log('Comments overlay closed');
    });

    // Handle new comment submission
    commentInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const commentText = commentInput.value.trim();
            if (commentText) {
                const newComment = document.createElement('div');
                newComment.classList.add('comment-item');
                newComment.innerHTML = `
                    <img src="https://via.placeholder.com/30" alt="Your Avatar" class="comment-avatar">
                    <div class="comment-content">
                        <div class="comment-info">
                            <span class="comment-user">You</span>
                            <span class="comment-date">07-19</span>
                        </div>
                        <p class="comment-text">${commentText}</p>
                    </div>
                    <div class="comment-actions">
                        <i class="fa-regular fa-heart comment-like-icon"></i>
                        <span class="comment-like-count">0</span>
                        <i class="fa-solid fa-thumbs-down"></i>
                    </div>
                `;
                commentsList.appendChild(newComment);
                commentInput.value = '';
                commentsList.scrollTop = commentsList.scrollHeight;
                console.log('Comment sent:', commentText);
            }
        }
    });

    // --- Share Icon Click ---
    shareActionItems.forEach(item => {
        item.addEventListener('click', () => {
            alert('Share sheet would open here!');
            console.log('Share icon clicked');
        });
    });

    // --- Top Navigation Active State ---
    topNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            topNavLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
            console.log(`Top nav clicked: ${link.dataset.targetPage}`);
        });
    });

    // --- Bottom Navigation Active State ---
    bottomNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            bottomNavItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            console.log(`Bottom nav clicked: ${item.dataset.navTarget}`);
        });
    });
});