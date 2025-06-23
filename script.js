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