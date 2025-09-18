document.addEventListener('DOMContentLoaded', () => {
    const showShareSheetTrigger = document.querySelector('.show-share-sheet-trigger');
    const shareSheet = document.querySelector('.share-sheet');
    const shareSheetBackdrop = document.querySelector('.share-sheet-backdrop');
    const closeBtn = document.querySelector('.close-btn');
    const dragHandle = document.querySelector('.drag-handle');
    const mainPageContent = document.querySelector('.main-page-content');

    const shareVideo = document.querySelector('.share-video');
    const videoOverlayShare = document.querySelector('.video-overlay-share');
    const playPauseBtn = document.querySelector('.play-pause-btn');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');

    const shareActionButtons = document.querySelectorAll('.share-action-btn');

    let isDragging = false;
    let startY;
    let startBottom;

    // --- Share Sheet Show/Hide Logic ---
    function showShareSheet() {
        shareSheet.classList.remove('hidden');
        shareSheetBackdrop.classList.remove('hidden');
        setTimeout(() => {
            shareSheet.classList.add('active');
            mainPageContent.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = 'hidden';
            shareVideo.play().catch(e => console.error("Video play failed:", e));
            videoOverlayShare.classList.remove('playing');
        }, 10);
    }

    function hideShareSheet() {
        shareSheet.classList.remove('active');
        mainPageContent.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'auto';
        shareVideo.pause();
        videoOverlayShare.classList.add('playing');
        setTimeout(() => {
            shareSheet.classList.add('hidden');
            shareSheetBackdrop.classList.add('hidden');
        }, 300);
    }

    if (showShareSheetTrigger) {
        showShareSheetTrigger.addEventListener('click', showShareSheet);
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', hideShareSheet);
    }
    if (shareSheetBackdrop) {
        shareSheetBackdrop.addEventListener('click', hideShareSheet);
    }

    // --- Share Sheet Dragging Functionality ---
    if (dragHandle) {
        dragHandle.addEventListener('mousedown', startDrag);
        dragHandle.addEventListener('touchstart', startDrag);
    }

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

    // --- Video Playback within Share Sheet ---
    if (videoOverlayShare) {
        videoOverlayShare.addEventListener('click', () => {
            if (shareVideo.paused) {
                shareVideo.play();
                videoOverlayShare.classList.remove('playing');
            } else {
                shareVideo.pause();
                videoOverlayShare.classList.add('playing');
            }
        });
    }

    // --- Fullscreen Video ---
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            if (shareVideo.requestFullscreen) {
                shareVideo.requestFullscreen();
            } else if (shareVideo.webkitRequestFullscreen) {
                shareVideo.webkitRequestFullscreen();
            } else if (shareVideo.msRequestFullscreen) {
                shareVideo.msRequestFullscreen();
            }
        });
    }

    // --- Share Actions ---
    shareActionButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const action = button.dataset.action;
            const videoUrl = shareVideo.src;

            switch (action) {
                case 'repost':
                    alert('Reposting video...');
                    break;
                case 'copy-link':
                    try {
                        await navigator.clipboard.writeText(videoUrl);
                        alert('Link copied to clipboard!');
                    } catch (err) {
                        console.error('Failed to copy: ', err);
                        alert('Failed to copy link.');
                    }
                    break;
                case 'facebook':
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`, '_blank');
                    break;
                case 'whatsapp':
                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(videoUrl)}`, '_blank');
                    break;
                case 'status':
                    alert('Sharing to WhatsApp Status...');
                    break;
                case 'messages':
                    alert('Opening messages app...');
                    break;
                case 'report':
                    alert('Reporting video...');
                    break;
                case 'not-interested':
                    alert('Marked as not interested.');
                    break;
                case 'save-video':
                    alert('Saving video...');
                    break;
                case 'add-to-story':
                    alert('Adding to story...');
                    break;
                case 'cast':
                    alert('Casting video...');
                    break;
                default:
                    alert(`Action: ${action}`);
            }
            if (action!== 'copy-link') {
                hideShareSheet();
            }
        });
    });

    // --- Search Bar functionality ---
    const searchInput = document.querySelector('.search-bar-share-sheet.search-input');
    const clearSearchIcon = document.querySelector('.search-bar-share-sheet.clear-search-icon');

    if (searchInput && clearSearchIcon) {
        searchInput.addEventListener('input', () => {
            if (searchInput.value.length > 0) {
                clearSearchIcon.classList.remove('hidden');
            } else {
                clearSearchIcon.classList.add('hidden');
            }
        });

        clearSearchIcon.addEventListener('click', () => {
            searchInput.value = '';
            clearSearchIcon.classList.add('hidden');
            searchInput.focus();
        });
    }
});