 /*------navbar js ----------------------------------*/

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
 
 
 /*----------------------------------------------------------------*/
     document.addEventListener('DOMContentLoaded', function() {
            // Get all modal elements
            const modals = {
                'oeko-tex': document.getElementById('certificate-oeko-tex-modal'),
                'fsc': document.getElementById('certificate-fsc-modal'),
                'grs': document.getElementById('certificate-grs-modal'),
                'iso': document.getElementById('certificate-iso-modal')
            };

            // Get all view buttons
            const viewButtons = document.querySelectorAll('.certificate-view-pdf');
            
            // Get all close buttons
            const closeButtons = document.querySelectorAll('.certificate-close-modal');
            
            // Function to show modal
            function showModal(certificateKey) {
                const modal = modals[certificateKey];
                if (modal) {
                    // Hide all modals first
                    Object.values(modals).forEach(m => m.classList.remove('active'));
                    
                    // Show the selected modal
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                    
                    // Hide the loader after PDF is loaded (simulated with timeout)
                    const loader = modal.querySelector('.certificate-pdf-loader');
                    const iframe = modal.querySelector('.certificate-pdf-viewer');
                    
                    // In a real implementation, you would use iframe.onload
                    setTimeout(() => {
                        loader.style.display = 'none';
                        iframe.classList.add('active');
                    }, 1000);
                }
            }
            
            // Function to close all modals
            function closeAllModals() {
                Object.values(modals).forEach(modal => {
                    modal.classList.remove('active');
                    const loader = modal.querySelector('.certificate-pdf-loader');
                    const iframe = modal.querySelector('.certificate-pdf-viewer');
                    loader.style.display = 'flex';
                    iframe.classList.remove('active');
                });
                document.body.style.overflow = 'auto';
            }
            
            // Add click event to view buttons
            viewButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const certificateKey = this.getAttribute('data-certificate');
                    showModal(certificateKey);
                });
            });
            
            // Add click event to close buttons
            closeButtons.forEach(button => {
                button.addEventListener('click', closeAllModals);
            });
            
            // Close modal when clicking outside
            Object.values(modals).forEach(modal => {
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        closeAllModals();
                    }
                });
            });
            
            // Close modal with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeAllModals();
                }
            });
            
            // Generate PDF thumbnails (visual only - would need server-side for real implementation)
            function generatePdfThumbnails() {
                const previews = document.querySelectorAll('.certificate-preview');
                const colors = [
                    'linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)',
                    'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(249, 168, 37, 0.2) 100%)',
                    'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
                    'linear-gradient(135deg, rgba(20, 184, 166, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)'
                ];
                
                previews.forEach((preview, index) => {
                    preview.style.background = colors[index % colors.length];
                });
            }
            
            generatePdfThumbnails();
        });