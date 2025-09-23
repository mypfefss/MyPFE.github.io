// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
});

// Smooth Scrolling for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Animate Elements on Scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.stat-item, .feature, .program-item, .organizer, .workshop-card, .schedule-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animation styles
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.stat-item, .feature, .program-item, .organizer, .workshop-card, .schedule-item');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Registration Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('registrationModal');
    const registerBtns = document.querySelectorAll('.register-btn');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelRegistration');
    const modalTitle = document.getElementById('modalTitle');
    const academicSection = document.getElementById('academicSection');

    if (modal && registerBtns.length > 0) {
        registerBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const type = this.getAttribute('data-type');
                if (type === 'student') {
                    modalTitle.textContent = 'Student Registration';
                    academicSection.style.display = 'block';
                } else {
                    modalTitle.textContent = 'Company Registration';
                    academicSection.style.display = 'none';
                }
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        [closeModal, cancelBtn].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', function() {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                });
            }
        });

        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// FAQ Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faq => faq.classList.remove('active'));
                
                // Open clicked item if it wasn't already active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
});

// Registration Form Handling
function handleRegistration(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(form);
        const registrationData = Object.fromEntries(formData.entries());
        
        // Handle multiple workshop selections
        const workshops = formData.getAll('workshops');
        registrationData.workshops = workshops;
        
        console.log('Registration Data:', registrationData);
        
        // Show success message
        showSuccessMessage('Registration submitted successfully! We will contact you soon.');
        
        // Close modal
        const modal = document.getElementById('registrationModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        // Reset form
        form.reset();
    });
}

// Partnership Form Handling
function handlePartnershipForm(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const partnershipData = Object.fromEntries(formData.entries());
        
        console.log('Partnership Data:', partnershipData);
        
        showSuccessMessage('Partnership request submitted successfully! We will contact you soon to discuss the details.');
        
        // Reset form
        form.reset();
    });
}

// Success Message Display
function showSuccessMessage(message) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.success-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 2001;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    successDiv.textContent = message;
    
    document.body.appendChild(successDiv);
    
    // Animate in
    setTimeout(() => {
        successDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        successDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            successDiv.remove();
        }, 300);
    }, 5000);
}

// Initialize forms when page loads
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const partnershipForms = document.querySelectorAll('.partnership-form');
    
    if (registrationForm) {
        handleRegistration(registrationForm);
    }
    
    partnershipForms.forEach(handlePartnershipForm);
});

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        if (target === 0) return;
        
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            const suffix = counter.textContent.includes('+') ? '+' : '';
            const prefix = counter.textContent.match(/^\D*/)[0];
            counter.textContent = prefix + Math.floor(current) + suffix;
        }, 20);
    });
}

// Trigger counter animation when stats section is visible
let countersAnimated = false;
window.addEventListener('scroll', function() {
    const statsSection = document.querySelector('.stats');
    if (statsSection && !countersAnimated) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            animateCounters();
            countersAnimated = true;
        }
    }
});

// Preloader (optional)
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Back to Top Button
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-chevron-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    document.body.appendChild(button);
}

// Schedule Item Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const scheduleItems = document.querySelectorAll('.schedule-item');
    
    scheduleItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});

// Workshop Card Animations
document.addEventListener('DOMContentLoaded', function() {
    const workshopCards = document.querySelectorAll('.workshop-card');
    
    workshopCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', function() {
            this.querySelector('.workshop-icon').style.transform = 'rotateY(180deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.workshop-icon').style.transform = 'rotateY(0)';
        });
    });
});

// Initialize back to top button
document.addEventListener('DOMContentLoaded', createBackToTopButton);
