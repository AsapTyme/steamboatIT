document.addEventListener('DOMContentLoaded', function() {
    // Wait for EmailJS to load before initializing
    if (typeof emailjs !== 'undefined') {
        emailjs.init('wFv-9VvYvbwSg69au'); 
    }

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if EmailJS is available
        if (typeof emailjs === 'undefined') {
            showFormStatus('Email service not available. Please contact us directly.', 'error');
            return;
        }
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'SENDING...';
        
        emailjs.sendForm('service_vuc1gct', 'template_ny6of79', this)
        .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        showFormStatus('Message sent successfully! We\'ll get back to you soon.', 'success');
        contactForm.reset();
        }, function(error) {
        console.log('FAILED...', error);
        showFormStatus('Failed to send message. Please try again or contact us directly.', 'error');

            })
            .finally(function() {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            });
    });

    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        
        setTimeout(() => {
            formStatus.className = 'form-status';
        }, 5000);
    }
});