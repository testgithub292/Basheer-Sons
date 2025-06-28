// document.addEventListener('DOMContentLoaded', function () {
//     var images = document.querySelectorAll('img');
//     var totalImages = images.length;
//     var imagesLoaded = 0;
//     var maxWait = 9000; // 5 seconds
//     var preloadCleared = false;

//     if (totalImages === 0) {
//         setTimeout(markAsLoaded, 500); // No images, wait briefly
//     } else {
//         images.forEach(function (img) {
//             if (img.complete) {
//                 imageLoaded();
//             } else {
//                 img.addEventListener('load', imageLoaded);
//                 img.addEventListener('error', imageLoaded);
//             }
//         });
//     }

//     // Safety: Remove preloader after 5 seconds no matter what
//     setTimeout(function () {
//         if (!preloadCleared) {
//             markAsLoaded();
//         }
//     }, maxWait);

//     function imageLoaded() {
//         imagesLoaded++;
//         if (imagesLoaded === totalImages && !preloadCleared) {
//             markAsLoaded();
//         }
//     }
// });

// window.addEventListener('load', function () {
//     if (!document.body.classList.contains('content-loaded')) {
//         markAsLoaded();
//     }
// });

// function markAsLoaded() {
//     if (document.body.classList.contains('content-loaded')) return;

//     document.body.classList.add('content-loaded');
//     var preloader = document.getElementById('preloader');

//     setTimeout(function () {
//         if (preloader) {
//             preloader.style.display = 'none';
//         }
//     }, 1000); // Small fade-out delay
// }

 // Check if user already visited in this session
    if (!sessionStorage.getItem('hasVisited')) {
        // Show preloader for 5 seconds
        setTimeout(function () {
            document.body.classList.add('loaded');
            var preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.style.display = 'none';
            }

            // Mark that user has visited in this session
            sessionStorage.setItem('hasVisited', 'true');
        }, 5000);
    } else {
        // Already visited, skip loading screen
        document.body.classList.add('loaded');
        var preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.display = 'none';
        }
    }

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



        /*----------------------------------------------------*/
          // Scroll Animation Trigger
        document.addEventListener('DOMContentLoaded', function() {
            const animatedElements = document.querySelectorAll('.bs-animate');
            
            const animateOnScroll = function() {
                animatedElements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (elementPosition < windowHeight - 100) {
                        element.classList.add(element.classList[2]); // Add the animation class
                    }
                });
            };
            
            // Initial check
            animateOnScroll();
            
            // Check on scroll
            window.addEventListener('scroll', animateOnScroll);
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });





        /*----------------------------------------------*/
        