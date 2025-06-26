// Wait for DOM and all resources to be fully loaded
        document.addEventListener('DOMContentLoaded', function() {
            // First make sure all images are loaded
            var images = document.querySelectorAll('img');
            var totalImages = images.length;
            var imagesLoaded = 0;
            
            if(totalImages === 0) {
                // If no images, just wait a bit for other resources
                setTimeout(markAsLoaded, 500);
            } else {
                // Check each image
                images.forEach(function(img) {
                    if(img.complete) {
                        imageLoaded();
                    } else {
                        img.addEventListener('load', imageLoaded);
                        img.addEventListener('error', imageLoaded); // even if error occurs
                    }
                });
            }
            
            function imageLoaded() {
                imagesLoaded++;
                if(imagesLoaded === totalImages) {
                    markAsLoaded();
                }
            }
        });
        
        // Also check when window loads as fallback
        window.addEventListener('load', function() {
            // If not already marked as loaded
            if(!document.body.classList.contains('content-loaded')) {
                markAsLoaded();
            }
        });
        
        function markAsLoaded() {
            document.body.classList.add('content-loaded');
            
            // Remove preloader from DOM after fade out
            setTimeout(function() {
                var preloader = document.getElementById('preloader');
                if(preloader) {
                    preloader.style.display = 'none';
                }
            }, 500);
        }

        /*------------------------------*/




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
