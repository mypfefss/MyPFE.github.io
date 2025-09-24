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

// Load schedule from JSON
async function loadSchedule() {
    try {
        // Try different possible paths depending on where the page is located
        const possiblePaths = ['./data/schedule.json', '../data/schedule.json', '/data/schedule.json'];
        let data = null;
        
        for (const path of possiblePaths) {
            try {
                const response = await fetch(path);
                if (response.ok) {
                    data = await response.json();
                    break;
                }
            } catch (err) {
                // Continue to next path
                continue;
            }
        }
        
        if (data && data.schedule) {
            displaySchedule(data.schedule);
        } else {
            console.warn('No schedule data found, using fallback');
            displayFallbackSchedule();
        }
    } catch (error) {
        console.error('Error loading schedule:', error);
        displayFallbackSchedule();
    }
}

function displaySchedule(scheduleItems) {
    const container = document.querySelector('.schedule-list');
    if (!container) {
        console.warn('Schedule container (.schedule-list) not found');
        return;
    }
    
    const html = scheduleItems.map(item => `
        <div class="schedule-item">
            <div class="schedule-time">
                <span class="time">${item.time}</span>
            </div>
            <div class="schedule-content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                ${item.details ? `
                    <div class="schedule-details">
                        ${item.details.map(detail => `
                            <span class="detail-item">
                                <i class="fas ${detail.icon || 'fa-info-circle'}"></i> 
                                ${detail.text}
                            </span>
                        `).join('')}
                    </div>
                ` : ''}
                ${item.speakers ? `
                    <div class="speakers">
                        <h4>Speakers:</h4>
                        <ul>
                            ${item.speakers.map(speaker => `<li>${speaker}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
    console.log('Schedule loaded successfully');
}

function displayFallbackSchedule() {
    const container = document.querySelector('.schedule-list');
    if (!container) return;
    
    container.innerHTML = `
        <div class="schedule-item">
            <div class="schedule-time">
                <span class="time">09:00</span>
            </div>
            <div class="schedule-content">
                <h3>Opening Ceremony</h3>
                <p>Welcome address and event overview</p>
            </div>
        </div>
        <div class="schedule-item">
            <div class="schedule-time">
                <span class="time">10:15</span>
            </div>
            <div class="schedule-content">
                <h3>Technical Workshops</h3>
                <p>Hands-on sessions on latest technologies</p>
            </div>
        </div>
        <div class="schedule-item">
            <div class="schedule-time">
                <span class="time">13:45</span>
            </div>
            <div class="schedule-content">
                <h3>Company Booths</h3>
                <p>Explore opportunities and network</p>
            </div>
        </div>
        <div class="schedule-item">
            <div class="schedule-time">
                <span class="time">15:45</span>
            </div>
            <div class="schedule-content">
                <h3>Partner Workshops</h3>
                <p>Special sessions by industry partners</p>
            </div>
        </div>
    `;
    console.log('Fallback schedule loaded');
}

// Load schedule when page loads
document.addEventListener('DOMContentLoaded', loadSchedule);
document.addEventListener('DOMContentLoaded', loadSchedule);
// Load former partners from JSON
async function loadFormerPartners() {
    try {
        console.log('Loading former partners...');
        
        // Try different possible paths depending on where the page is located
        const possiblePaths = ['./data/partners.json', '../data/partners.json', '/data/partners.json'];
        let data = null;
        
        for (const path of possiblePaths) {
            try {
                const response = await fetch(path);
                if (response.ok) {
                    data = await response.json();
                    console.log('Partners data loaded from:', path, data);
                    break;
                }
            } catch (err) {
                console.log('Failed to load from path:', path);
                continue;
            }
        }
        
        if (data && data.formerPartners && Array.isArray(data.formerPartners)) {
            displayFormerPartners(data.formerPartners);
        } else {
            console.warn('No partners data found, using fallback');
            displayPartnersFallback();
        }
    } catch (error) {
        console.error('Error loading former partners:', error);
        displayPartnersFallback();
    }
}

function displayFormerPartners(partners) {
    const container = document.querySelector('.partners-grid');
    if (!container) {
        console.warn('Partners grid container not found');
        return;
    }
    
    const html = partners.map(partner => `
        <div class="partner-logo" data-category="${partner.category}" data-year="${partner.year}">
            <img src="${partner.logo}" alt="${partner.name}" title="${partner.name} - ${partner.category}">
            <div class="partner-info">
                <h4>${partner.name}</h4>
                <p>${partner.category}</p>
                <span class="partner-year">${partner.year}</span>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
    
    // Add hover effects
    addPartnerHoverEffects();
}

function addPartnerHoverEffects() {
    const partnerLogos = document.querySelectorAll('.partner-logo');
    
    partnerLogos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

function displayPartnersFallback() {
    const container = document.querySelector('.partners-grid');
    if (!container) return;
    
    container.innerHTML = `
        <div class="partner-logo">
            <div class="partner-placeholder">
                <i class="fas fa-building"></i>
                <p>Partner logos will be displayed here</p>
            </div>
        </div>
    `;
}



// Load partners when page loads (only on sponsors page)
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the sponsors/partners page
    if (window.location.pathname.includes('sponsors.html') || 
        document.querySelector('.former-partners')) {
        loadFormerPartners();
    }
});

function displayFormerPartners(partners) {
    const container = document.querySelector('.partners-grid');
    if (!container) {
        console.warn('Partners grid container not found');
        return;
    }
    
    const html = partners.map(partner => `
        <div class="partner-logo" data-category="${partner.category}" data-year="${partner.year}">
            <img src="${partner.logo}" alt="${partner.name}" title="${partner.name} - ${partner.category}">
            <div class="partner-info">
                <h4>${partner.name}</h4>
                <p>${partner.category}</p>
                <span class="partner-year">${partner.year}</span>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
    
    // Add hover effects
    addPartnerHoverEffects();
}

function addPartnerHoverEffects() {
    const partnerLogos = document.querySelectorAll('.partner-logo');
    
    partnerLogos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

function displayPartnersFallback() {
    const container = document.querySelector('.partners-grid');
    if (!container) return;
    
    container.innerHTML = `
        <div class="partner-logo">
            <div class="partner-placeholder">
                <i class="fas fa-building"></i>
                <p>Partner logos will be displayed here</p>
            </div>
        </div>
    `;
}

// Load partners when page loads (only on sponsors page)
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the sponsors/partners page
    if (window.location.pathname.includes('sponsors.html') || 
        document.querySelector('.former-partners')) {
        loadFormerPartners();
    }
    
    // Check if we're on the program page
    if (window.location.pathname.includes('program.html') || 
        document.querySelector('.workshops-grid')) {
        loadWorkshops();
    }
});

// Load workshops from JSON
async function loadWorkshops() {
    try {
        console.log('Loading workshops...');
        
        // Try different possible paths depending on where the page is located
        const possiblePaths = ['./data/workshops.json', '../data/workshops.json', '/data/workshops.json'];
        let data = null;
        
        for (const path of possiblePaths) {
            try {
                const response = await fetch(path);
                if (response.ok) {
                    data = await response.json();
                    console.log('Workshops data loaded from:', path, data);
                    break;
                }
            } catch (err) {
                console.log('Failed to load from path:', path);
                continue;
            }
        }
        
        if (data && data.workshops && Array.isArray(data.workshops)) {
            displayWorkshops(data.workshops);
        } else {
            console.warn('No workshops data found, using fallback');
            displayWorkshopsFallback();
        }
    } catch (error) {
        console.error('Error loading workshops:', error);
        displayWorkshopsFallback();
    }
}

function displayWorkshops(workshops) {
    const container = document.querySelector('.workshops-grid');
    if (!container) {
        console.warn('Workshops grid container not found');
        return;
    }
    
    const html = workshops.map(workshop => `
        <div class="workshop-card">
            <div class="workshop-icon">
                <i class="${workshop.icon}"></i>
            </div>
            <h3>${workshop.title}</h3>
            <p class="workshop-time">${workshop.time}</p>
            <p>${workshop.description}</p>
            <div class="workshop-info">
                ${workshop.features.map(feature => `
                    <span><i class="${feature.icon}"></i> ${feature.text}</span>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
    console.log('Workshops loaded successfully');
}

function displayWorkshopsFallback() {
    const container = document.querySelector('.workshops-grid');
    if (!container) return;
    
    container.innerHTML = `
        <div class="workshop-card">
            <div class="workshop-icon">
                <i class="fas fa-brain"></i>
            </div>
            <h3>AI & Machine Learning</h3>
            <p class="workshop-time">10:15 - 11:45 AM</p>
            <p>Explore the fundamentals of artificial intelligence and machine learning.</p>
            <div class="workshop-info">
                <span><i class="fas fa-user"></i> Expert Instructors</span>
                <span><i class="fas fa-laptop"></i> Hands-on Coding</span>
                <span><i class="fas fa-certificate"></i> Certificates</span>
            </div>
        </div>
        <div class="workshop-card">
            <div class="workshop-icon">
                <i class="fas fa-mobile-alt"></i>
            </div>
            <h3>Mobile Development</h3>
            <p class="workshop-time">10:15 - 11:45 AM</p>
            <p>Learn modern mobile app development using React Native and Flutter.</p>
            <div class="workshop-info">
                <span><i class="fas fa-code"></i> Live Coding</span>
                <span><i class="fas fa-mobile"></i> Cross-platform</span>
                <span><i class="fas fa-rocket"></i> Deploy Apps</span>
            </div>
        </div>
    `;
    console.log('Fallback workshops loaded');
}