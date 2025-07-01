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

//--------------------------------------------
let currentType = "quote";

        function switchType(type) {
            currentType = type;
            document.getElementById('btnQuote').classList.remove('active');
            document.getElementById('btnSample').classList.remove('active');
            document.getElementById('productGroup').style.display = type === 'sample' ? 'block' : 'none';
            document.getElementById('btn' + type.charAt(0).toUpperCase() + type.slice(1)).classList.add('active');
        }

        function handleSubmit(e) {
            e.preventDefault();

            // Get form values
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim(),
                product: currentType === "sample" ? document.getElementById('product').value : null,
                type: currentType
            };

            // Create professional email body
            const emailBody = `
=================================
${formData.type === "sample" ? "SAMPLE REQUEST" : "QUOTE REQUEST"}
=================================

NAME:    ${formData.name.toUpperCase()}
EMAIL:   ${formData.email}
SUBJECT: ${formData.subject.toUpperCase()}
${formData.type === "sample" ? `PRODUCT: ${formData.product.toUpperCase()}\n` : ''}
MESSAGE:
---------------------------------
${formData.message}
---------------------------------

Sent via: ${window.location.hostname}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}
  `.trim();

            // Create clean WhatsApp message (no emojis)
            const whatsappText = `
${formData.type === "sample" ? "SAMPLE REQUEST" : "QUOTE REQUEST"}

NAME: ${formData.name}
EMAIL: ${formData.email}
SUBJECT: ${formData.subject}
${formData.type === "sample" ? `PRODUCT: ${formData.product}\n` : ''}
MESSAGE:
${formData.message}

Sent via ${window.location.hostname}
${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
  `.trim();

            // Save data for modal
            window.formData = {
                subject: formData.type === "sample" ? "Sample Request" : "Quote Request",
                emailBody: emailBody,
                whatsappText: whatsappText
            };

            // Show modal and reset form
            document.getElementById('customModal').classList.add('show');
            e.target.reset();
            document.getElementById('productGroup').style.display = formData.type === "sample" ? "block" : "none";

            return false;
        }

        function sendBy(type) {
            const { subject, emailBody, whatsappText } = window.formData;

            if (type === 'email') {
                const mailto = `mailto:phixxlabs@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
                setTimeout(() => {
                    window.location.href = mailto;
                    closeModal();
                }, 300);
            } else if (type === 'whatsapp') {
                const number = '+923281246298';
                const whatsappURL = `https://wa.me/${number}?text=${encodeURIComponent(whatsappText)}`;
                setTimeout(() => {
                    window.open(whatsappURL, '_blank');
                    closeModal();
                }, 300);
            }
        }

        function closeModal() {
            document.getElementById('customModal').classList.remove('show');
        }