// Fix mobile viewport height (100vh issue on iOS/Android)
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setViewportHeight();
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);

document.addEventListener('DOMContentLoaded', function() {
    // Set viewport height again after DOM is ready
    setViewportHeight();
    
    // Batch DOM operations to prevent forced reflows
    requestAnimationFrame(function() {
        // Initialize all components after layout is complete
        initHamburgerMenu();
        initSmoothScrolling();
        initVideoPopup();
    });
    
    // Override jQuery operations that cause reflows if jQuery is loaded
    if (typeof $ !== 'undefined') {
        // Cache commonly used jQuery selectors
        var $window = $(window);
        var $body = $('body');
        var lastScrollTop = 0;
        
        // Throttle scroll events to reduce reflow frequency
        var scrollTimeout;
        $window.on('scroll', function() {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function() {
                var scrollTop = $window.scrollTop();
                // Only process if scroll position changed significantly
                if (Math.abs(scrollTop - lastScrollTop) > 10) {
                    lastScrollTop = scrollTop;
                    // Your scroll handling here
                }
            }, 16); // ~60fps
        });
        
        // Batch resize operations
        var resizeTimeout;
        $window.on('resize', function() {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                // Batch all resize-related DOM operations
                requestAnimationFrame(function() {
                    // Your resize handling here
                });
            }, 100);
        });
    }
});

// Hamburger Menu Functionality
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('.nav-link') : [];
    const body = document.body;

    function toggleMenu() {
        if (!hamburger || !mobileMenu) return;
        
        const isActive = hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Update ARIA attributes for accessibility
        hamburger.setAttribute('aria-expanded', isActive);
        
        // Disable/enable scrolling
        if (isActive) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Close menu when clicking on a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // For external links, close menu and let the link work normally
            if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
                if (hamburger && mobileMenu) {
                    hamburger.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    body.style.overflow = '';
                }
                // Don't prevent default - let the browser handle the external link
                return;
            }
            
            // For internal links, close menu
            if (hamburger && mobileMenu) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (hamburger && mobileMenu && 
            !hamburger.contains(event.target) && 
            !mobileMenu.contains(event.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        }
    });
}

// Smooth Scrolling Functionality
function initSmoothScrolling() {
    // Smooth scrolling for navigation links
    const allNavLinks = document.querySelectorAll('.nav-link');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip external links - let them work normally (don't interfere at all)
            if (!href || href.startsWith('http://') || href.startsWith('https://')) {
                return true; // Explicitly allow default behavior
            }
            
            // Only prevent default for internal anchor links
            if (!href.startsWith('#')) {
                return true;
            }
            
            e.preventDefault();
            const targetId = href.substring(1);
            
            // Try to find by ID first
            let targetSection = document.getElementById(targetId);
            
            // If not found by ID, try to find by class name
            if (!targetSection) {
                targetSection = document.querySelector('.' + targetId);
            }
            
            // Additional fallbacks for specific sections
            if (!targetSection) {
                switch(targetId) {
                    case 'tach-sponsorship-section':
                        targetSection = document.querySelector('.tach-sponsorship-section');
                        break;
                    case 'section-02':
                        targetSection = document.querySelector('.section-02');
                        break;
                    case 'tach-haus-section':
                        targetSection = document.querySelector('.tach-haus-section');
                        break;
                }
            }
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                console.log('Section not found: ' + targetId);
            }
        });
    });

    // Smooth scrolling for CTA buttons - but exclude modal triggers
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Only prevent default and scroll if it's a section link, not a modal trigger
            if (href && href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Video Popup Functionality
function initVideoPopup() {
    function openVideoPopup() {
        const popup = document.getElementById('videoPopup');
        const iframe = document.getElementById('youtubeVideo');
        
        if (popup && iframe) {
            // Set the YouTube video URL with autoplay
            iframe.src = 'https://www.youtube.com/embed/XM66YLfEjro?autoplay=1&rel=0';
            
            popup.classList.add('active');
            
            // Prevent background scrolling
            document.body.style.overflow = 'hidden';
        }
    }

    function closeVideoPopup() {
        const popup = document.getElementById('videoPopup');
        const iframe = document.getElementById('youtubeVideo');
        
        if (popup && iframe) {
            popup.classList.remove('active');
            
            // Clear the iframe src to stop the video
            iframe.src = '';
            
            // Restore background scrolling
            document.body.style.overflow = '';
        }
    }

    // Add event listeners for data-action buttons
    document.addEventListener('click', function(e) {
        const action = e.target.getAttribute('data-action');
        if (action === 'open-video-popup') {
            e.preventDefault();
            openVideoPopup();
        } else if (action === 'close-video-popup') {
            e.preventDefault();
            closeVideoPopup();
        }
    });

    // Keep global functions for backward compatibility if needed
    window.openVideoPopup = openVideoPopup;
    window.closeVideoPopup = closeVideoPopup;

    // Close popup when clicking outside the video
    const videoPopup = document.getElementById('videoPopup');
    if (videoPopup) {
        videoPopup.addEventListener('click', function(e) {
            if (e.target === this) {
                window.closeVideoPopup();
            }
        });
    }

    // Close popup with Escape key (only if video popup is active)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const popup = document.getElementById('videoPopup');
            if (popup && popup.classList.contains('active')) {
                window.closeVideoPopup();
            }
        }
    });
}

