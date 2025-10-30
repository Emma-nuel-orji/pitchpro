document.addEventListener('DOMContentLoaded', () => {
    const videoFeedCarousel = document.querySelector('.video-feed-carousel');
    const videoSlides = document.querySelectorAll('.video-slide');
    const feedVideos = document.querySelectorAll('.feed-video');
    const videoOverlays = document.querySelectorAll('.video-overlay');
    const heartActionItems = document.querySelectorAll('.heart-action-item');
    const heartIcons = document.querySelectorAll('.heart-icon');
    const heartCounts = document.querySelectorAll('.heart-action-item.action-count');
    const commentActionItems = document.querySelectorAll('.comment-action-item');
    const commentCounts = document.querySelectorAll('.comment-action-item.action-count');
    const shareActionItems = document.querySelectorAll('.share-action-item');
    const topNavLinks = document.querySelectorAll('.top-nav-tiktok.top-nav-link');
    const bottomNavItems = document.querySelectorAll('.bottom-nav-tiktok.nav-item');

    const commentsOverlay = document.querySelector('.comments-overlay');
    const closeCommentsBtn = commentsOverlay.querySelector('.close-comments-btn');
    const commentInput = commentsOverlay.querySelector('.comment-input-area input');
    const commentsList = commentsOverlay.querySelector('.comments-list');

    const shareSheet = document.querySelector('.share-sheet');
    const shareSheetBackdrop = document.querySelector('.share-sheet-backdrop');
    const closeBtnShareSheet = document.querySelector('.close-btn-share-sheet');
    const dragHandle = document.querySelector('.drag-handle');
    const shareVideo = document.querySelector('.share-video');
    const videoOverlayShare = document.querySelector('.video-overlay-share');
    const shareVideoPlayBtn = document.querySelector('.video-overlay-share.play-pause-btn');
    const shareVideoFullscreenBtn = document.querySelector('.video-preview-container.fullscreen-btn');
    const shareActionButtons = document.querySelectorAll('.share-action-btn');

    let currentVideoIndex = 0;
    let lastTapTime = 0;
    const DOUBLE_TAP_THRESHOLD = 300; // milliseconds

    // --- Video Feed Playback & Vertical Scroll ---
    function playCurrentVideo() {
        feedVideos.forEach((video, index) => {
            if (index === currentVideoIndex) {
                const playPromise = video.play();

                if (playPromise!== undefined) {
                    playPromise.then(() => {
                        videoOverlays[index].classList.remove('paused');
                        video.muted = false; // Unmute on initial play
                    }).catch(error => {
                        video.muted = true;
                        video.play();
                        videoOverlays[index].classList.remove('paused');
                    });
                }
            } else {
                video.pause();
                video.currentTime = 0;
                videoOverlays[index].classList.add('paused');
            }
        });
    }

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
            let heartCountElement = heartCounts[index];

            if (currentTime - lastTapTime < DOUBLE_TAP_THRESHOLD) {
                // Double tap detected
                heartIcon.classList.add('liked');
                heartIcon.classList.remove('fa-regular');
                heartIcon.classList.add('fa-solid');
                
                let currentCount = parseInt(heartCountElement.textContent.replace(/,/g, ''));
                heartCountElement.textContent = (currentCount + 1).toLocaleString();

                const animatedHeart = document.createElement('i');
                animatedHeart.classList.add('fa-solid', 'fa-heart', 'animated-heart');
                animatedHeart.style.left = `${event.clientX - overlay.getBoundingClientRect().left}px`;
                animatedHeart.style.top = `${event.clientY - overlay.getBoundingClientRect().top}px`;
                heartAnimationContainer.appendChild(animatedHeart);

                animatedHeart.addEventListener('animationend', () => {
                    animatedHeart.remove();
                });

                event.stopPropagation();
            } else {
                // Single tap detected
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
        const heartCountElement = item.querySelector('.action-count');
        heartIcon.addEventListener('click', () => {
            heartIcon.classList.toggle('liked');
            let currentCount = parseInt(heartCountElement.textContent.replace(/,/g, ''));
            if (heartIcon.classList.contains('liked')) {
                heartIcon.classList.remove('fa-regular');
                heartIcon.classList.add('fa-solid');
                currentCount++;
            } else {
                heartIcon.classList.remove('fa-solid');
                heartIcon.classList.add('fa-regular');
                currentCount--;
            }
            heartCountElement.textContent = currentCount.toLocaleString();
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
        });
    });

    closeCommentsBtn.addEventListener('click', () => {
        commentsOverlay.classList.remove('active');
        setTimeout(() => {
            commentsOverlay.classList.add('hidden');
        }, 300);
        
        feedVideos[currentVideoIndex].play();
        videoOverlays[currentVideoIndex].classList.remove('paused');
    });

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

                let commentCountElement = commentCounts[currentVideoIndex];
                let currentCount = parseInt(commentCountElement.textContent);
                commentCountElement.textContent = (currentCount + 1).toLocaleString();
            }
        }
    });

    // --- Share Sheet Functionality ---
    function showShareSheet() {
        shareSheet.classList.remove('hidden');
        shareSheetBackdrop.classList.remove('hidden');
        setTimeout(() => {
            shareSheet.classList.add('active');
            document.body.style.overflow = 'hidden';
            shareVideo.play().catch(e => console.error("Video play failed:", e));
            videoOverlayShare.classList.remove('playing');
        }, 10);
    }

    function hideShareSheet() {
        shareSheet.classList.remove('active');
        document.body.style.overflow = 'auto';
        shareVideo.pause();
        videoOverlayShare.classList.add('playing');
        setTimeout(() => {
            shareSheet.classList.add('hidden');
            shareSheetBackdrop.classList.add('hidden');
        }, 300);
    }

    shareActionItems.forEach(item => {
        item.addEventListener('click', showShareSheet);
    });
    
    closeBtnShareSheet.addEventListener('click', hideShareSheet);
    shareSheetBackdrop.addEventListener('click', hideShareSheet);

    // Share Sheet Dragging
    let isDragging = false;
    let startY;
    let startBottom;

    dragHandle.addEventListener('mousedown', startDrag);
    dragHandle.addEventListener('touchstart', startDrag);

    function startDrag(e) {
        isDragging = true;
        startY = e.clientY |

 e.touches.clientY;
        startBottom = parseInt(getComputedStyle(shareSheet).bottom);
        shareSheet.style.transition = 'none';

        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchend', stopDrag);
    }

    function drag(e) {
        if (!isDragging) return;
        
        const currentY = e.clientY |

 e.touches.clientY;
        const deltaY = currentY - startY;
        let newBottom = startBottom - deltaY;
        newBottom = Math.max(newBottom, 0);

        shareSheet.style.bottom = `${newBottom}px`;
    }

    function stopDrag() {
        isDragging = false;
        shareSheet.style.transition = 'transform 0.3s ease-out';

        const sheetHeight = shareSheet.clientHeight;
        const currentBottom = parseInt(shareSheet.style.bottom);

        if (currentBottom < sheetHeight * 0.7) {
            hideShareSheet();
            shareSheet.style.bottom = '0px';
        } else {
            shareSheet.style.bottom = '0px';
            shareSheet.classList.add('active');
        }

        document.removeEventListener('mousemove', drag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchend', stopDrag);
    }

    // Share Actions
    shareActionButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const action = button.dataset.action;
            const videoUrl = shareVideo.src;

            switch (action) {
                case 'repost': alert('Reposting video...'); break;
                case 'copy-link':
                    try {
                        await navigator.clipboard.writeText(videoUrl);
                        alert('Link copied to clipboard!');
                    } catch (err) {
                        console.error('Failed to copy: ', err);
                        alert('Failed to copy link.');
                    }
                    break;
                case 'facebook': window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`, '_blank'); break;
                case 'whatsapp': window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(videoUrl)}`, '_blank'); break;
                case 'status': alert('Sharing to WhatsApp Status...'); break;
                case 'messages': alert('Opening messages app...'); break;
                case 'report': alert('Reporting video...'); break;
                case 'not-interested': alert('Marked as not interested.'); break;
                case 'save-video': alert('Saving video...'); break;
                case 'add-to-story': alert('Adding to story...'); break;
                case 'cast': alert('Casting video...'); break;
            }
            if (action!== 'copy-link') { hideShareSheet(); }
        });
    });

    // Video Playback within Share Sheet
    videoOverlayShare.addEventListener('click', () => {
        if (shareVideo.paused) {
            shareVideo.play();
            videoOverlayShare.classList.remove('playing');
        } else {
            shareVideo.pause();
            videoOverlayShare.classList.add('playing');
        }
    });

    // Fullscreen Video
    if (shareVideoFullscreenBtn) {
        shareVideoFullscreenBtn.addEventListener('click', () => {
            if (shareVideo.requestFullscreen) { shareVideo.requestFullscreen(); }
        });
    }

    // Top Navigation Active State
    topNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            topNavLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Bottom Navigation Active State
    bottomNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            bottomNavItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
});