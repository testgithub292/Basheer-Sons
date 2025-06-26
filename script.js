    // Track loading progress
        let resourcesLoaded = 0;
        let totalResources = 0;
        const progressBar = document.getElementById('loader-progress');
        
        // Function to update progress bar
        function updateProgress() {
            const progress = (resourcesLoaded / totalResources) * 100;
            progressBar.style.width = `${progress}%`;
            
            if (progress >= 100) {
                setTimeout(() => {
                    document.body.classList.add('loaded');
                    document.getElementById('preloader').style.opacity = '0';
                    setTimeout(() => {
                        document.getElementById('preloader').style.display = 'none';
                        document.getElementById('main-content').style.display = 'block';
                    }, 500);
                }, 300);
            }
        }
        
        // Check all page resources
        function checkResources() {
            // Get all resources that need to load
            const images = document.querySelectorAll('img');
            const iframes = document.querySelectorAll('iframe');
            const videos = document.querySelectorAll('video');
            const audios = document.querySelectorAll('audio');
            const scripts = document.querySelectorAll('script[src]');
            const links = document.querySelectorAll('link[rel="stylesheet"]');
            
            totalResources = images.length + iframes.length + videos.length + 
                          audios.length + scripts.length + links.length + 1; // +1 for DOMContentLoaded
            
            // If no resources, just wait for DOM
            if (totalResources === 1) {
                resourcesLoaded = 1;
                updateProgress();
                return;
            }
            
            // Check DOM ready first
            document.addEventListener('DOMContentLoaded', () => {
                resourcesLoaded++;
                updateProgress();
            });
            
            // Check images
            images.forEach(img => {
                if (img.complete) {
                    resourcesLoaded++;
                    updateProgress();
                } else {
                    img.addEventListener('load', () => {
                        resourcesLoaded++;
                        updateProgress();
                    });
                    img.addEventListener('error', () => {
                        resourcesLoaded++;
                        updateProgress();
                    });
                }
            });
            
            // Check other resources
            const elements = [...iframes, ...videos, ...audios, ...scripts, ...links];
            elements.forEach(el => {
                if (el.readyState === 'complete' || el.readyState === 'loaded') {
                    resourcesLoaded++;
                    updateProgress();
                } else {
                    el.addEventListener('load', () => {
                        resourcesLoaded++;
                        updateProgress();
                    });
                    el.addEventListener('error', () => {
                        resourcesLoaded++;
                        updateProgress();
                    });
                }
            });
        }
        
        // Start checking resources
        checkResources();
        
        // Fallback - if something goes wrong, show page after 5 seconds max
        setTimeout(() => {
            if (!document.body.classList.contains('loaded')) {
                document.body.classList.add('loaded');
                document.getElementById('preloader').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('preloader').style.display = 'none';
                    document.getElementById('main-content').style.display = 'block';
                }, 500);
            }
        }, 5000);




// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Dropdown Menu for Mobile
const dropdowns = document.querySelectorAll('.dropdown > a');

dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const menu = dropdown.nextElementSibling;
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        }
    });
});

/*--------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', function() {
            const track = document.querySelector('.slider-track');
            const slides = document.querySelectorAll('.slide');
            const dots = document.querySelectorAll('.slider-dot');
            const arrowLeft = document.querySelector('.arrow-left');
            const arrowRight = document.querySelector('.arrow-right');
            let currentIndex = 0;
            let autoSlideInterval;
            let isAnimating = false;
            
            // Function to go to specific slide
            function goToSlide(index) {
                if (isAnimating) return;
                
                isAnimating = true;
                
                // Update track position
                track.style.transform = `translateX(-${index * 100}%)`;
                
                // Update active class on slides
                slides.forEach((slide, i) => {
                    slide.classList.toggle('active', i === index);
                });
                
                // Update dots
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
                
                currentIndex = index;
                
                // Reset animation lock
                setTimeout(() => {
                    isAnimating = false;
                }, 800);
            }
            
            // Dot click handlers
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    if (index === currentIndex) return;
                    clearInterval(autoSlideInterval);
                    goToSlide(index);
                    startAutoSlide();
                });
            });
            
            // Arrow click handlers
            arrowLeft.addEventListener('click', () => {
                clearInterval(autoSlideInterval);
                const newIndex = (currentIndex - 1 + slides.length) % slides.length;
                goToSlide(newIndex);
                startAutoSlide();
            });
            
            arrowRight.addEventListener('click', () => {
                clearInterval(autoSlideInterval);
                const newIndex = (currentIndex + 1) % slides.length;
                goToSlide(newIndex);
                startAutoSlide();
            });
            
            // Start auto sliding
            function startAutoSlide() {
                autoSlideInterval = setInterval(() => {
                    const newIndex = (currentIndex + 1) % slides.length;
                    goToSlide(newIndex);
                }, 5000);
            }
            
            // Initialize first slide and start auto slide
            goToSlide(0);
            startAutoSlide();
            
            // Pause on hover
            track.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });
            
            track.addEventListener('mouseleave', startAutoSlide);
            
            // Touch support for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            
            track.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                clearInterval(autoSlideInterval);
            }, {passive: true});
            
            track.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
                startAutoSlide();
            }, {passive: true});
            
            function handleSwipe() {
                if (isAnimating) return;
                
                const difference = touchStartX - touchEndX;
                if (difference > 50) {
                    // Swipe left - next slide
                    const newIndex = (currentIndex + 1) % slides.length;
                    goToSlide(newIndex);
                } else if (difference < -50) {
                    // Swipe right - previous slide
                    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
                    goToSlide(newIndex);
                }
            }
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    arrowLeft.click();
                } else if (e.key === 'ArrowRight') {
                    arrowRight.click();
                }
            });
        });
