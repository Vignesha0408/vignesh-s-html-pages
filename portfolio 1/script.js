// Preloader functionality
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(function() {
        preloader.classList.add('hidden');
    }, 1000);
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('appear');
        }
    });
}

// Initialize scroll animations
window.addEventListener('scroll', animateOnScroll);
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Animate skill bars when they come into view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.1;
        
        if (barPosition < screenPosition) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        }
    });
}

// Animate circular progress when they come into view
function animateCircularProgress() {
    const circles = document.querySelectorAll('.progress-value');
    
    circles.forEach(circle => {
        const circlePosition = circle.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.1;
        
        if (circlePosition < screenPosition) {
            const parent = circle.closest('.circle-progress');
            const percent = parent.getAttribute('data-percent');
            const rotation = (percent / 100) * 360;
            circle.style.transform = `rotate(${rotation}deg)`;
        }
    });
}

// Combined animation function
function animateSkills() {
    animateSkillBars();
    animateCircularProgress();
}

window.addEventListener('scroll', animateSkills);
document.addEventListener('DOMContentLoaded', animateSkills);

// Portfolio filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Form validation and submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name && email && message) {
            // Show success message (in a real application, you would send the data to a server)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Parallax effect for hero section
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.design-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

// Only apply parallax on larger screens
if (window.innerWidth > 768) {
    window.addEventListener('scroll', parallaxEffect);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements that should be animated
document.querySelectorAll('.service-card, .portfolio-item, .contact-item').forEach(el => {
    observer.observe(el);
});

// Add animation classes to CSS
const style = document.createElement('style');
style.textContent = `
    .animate {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .service-card, .portfolio-item, .contact-item {
        opacity: 0;
    }
`;
document.head.appendChild(style);

// Initialize portfolio items with animation properties
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    item.style.opacity = '0';
    item.style.transform = 'scale(0.8)';
});

// Set timeout to show portfolio items after page load
setTimeout(() => {
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
    });
}, 500);

// Add hover effect to portfolio items
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Add typing animation to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing effect to hero title (optional)
const heroTitle = document.querySelector('.hero-title span');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 150);
    }, 1500);
}

// Add ripple effect to buttons
document.querySelectorAll('.btn, .filter-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple element
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        // Add ripple to button
        this.appendChild(ripple);
        
        // Get position of click
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Position ripple
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles to CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn, .filter-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Add scroll to top button
function createScrollToTopButton() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.classList.add('scroll-to-top');
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
}

// Create scroll to top button
createScrollToTopButton();

// Add animation to scroll to top button
const scrollButtonStyle = document.createElement('style');
scrollButtonStyle.textContent = `
    .scroll-to-top:hover {
        background: #0056b3;
        transform: translateY(-3px);
    }
`;
document.head.appendChild(scrollButtonStyle);

// Add image lazy loading for portfolio items
document.addEventListener('DOMContentLoaded', function() {
    const portfolioImages = document.querySelectorAll('.portfolio-img img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    portfolioImages.forEach(img => {
        imageObserver.observe(img);
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Testimonial slider functionality
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    testimonials[index].classList.add('active');
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
}

if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);

// Auto-rotate testimonials
setInterval(nextTestimonial, 5000);

// FAQ accordion functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// CV Download functionality
const downloadCVBtn = document.getElementById('downloadCV');

if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('In a real application, this would download your CV. For now, this is a placeholder.');
        // In a real implementation, you would have a link to your actual CV file
        // window.open('path/to/your/cv.pdf', '_blank');
    });
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        }
    });
}

// Project modal functionality
const portfolioLinks = document.querySelectorAll('.portfolio-link');

portfolioLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const projectId = this.getAttribute('data-project');
        openProjectModal(projectId);
    });
});

function openProjectModal(projectId) {
    // In a real application, you would fetch project details and display them
    const projectDetails = {
        'tech-nova': {
            title: 'TechNova Brand Identity',
            description: 'Complete brand identity package for a tech startup, including logo, color palette, typography, and brand guidelines. The design focuses on innovation and modernity while maintaining professionalism.',
            image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
            client: 'TechNova Inc.',
            services: ['Brand Identity', 'Logo Design', 'Brand Guidelines']
        },
        'creative-agency': {
            title: 'Creative Agency Website',
            description: 'Modern, responsive website design for a creative agency. The design emphasizes portfolio showcase and client engagement with smooth animations and intuitive navigation.',
            image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
            client: 'Creative Solutions',
            services: ['Web Design', 'UI/UX', 'Responsive Design']
        },
        'marketing-illustrations': {
            title: 'Marketing Campaign Illustrations',
            description: 'Custom illustration set for a marketing campaign. The illustrations follow a consistent style that aligns with the brand identity while conveying the campaign message effectively.',
            image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
            client: 'StyleHub',
            services: ['Illustration', 'Graphic Design', 'Marketing Materials']
        },
        'luxury-logo': {
            title: 'Luxury Brand Logo',
            description: 'Elegant and sophisticated logo design for a luxury brand. The logo captures the essence of exclusivity and quality through minimalistic design and premium typography.',
            image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
            client: 'Luxury Brands Co.',
            services: ['Logo Design', 'Brand Identity', 'Typography']
        },
        'mobile-app': {
            title: 'Mobile App Interface',
            description: 'Intuitive and user-friendly interface for a productivity mobile app. The design focuses on usability and accessibility while maintaining visual appeal.',
            image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
            client: 'Productivity Plus',
            services: ['UI Design', 'UX Design', 'Mobile Design']
        },
        'fashion-art': {
            title: 'Fashion Brand Art Direction',
            description: 'Creative direction and visual identity for a fashion brand. The project includes lookbooks, marketing materials, and digital assets with a cohesive artistic vision.',
            image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
            client: 'Fashion Forward',
            services: ['Art Direction', 'Brand Identity', 'Print Design']
        },
        'ecommerce': {
            title: 'E-commerce Platform',
            description: 'Complete e-commerce solution with product showcase, shopping cart, and checkout process. The design prioritizes user experience and conversion optimization.',
            image: 'https://images.unsplash.com/photo-1547954788-1c6e0c07e638?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
            client: 'ShopEasy',
            services: ['Web Design', 'UI/UX', 'E-commerce']
        },
        'dashboard': {
            title: 'Analytics Dashboard',
            description: 'Interactive dashboard for data visualization with real-time analytics. The design balances information density with visual clarity for optimal user experience.',
            image: 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80',
            client: 'Data Insights Inc.',
            services: ['UI Design', 'Data Visualization', 'Dashboard Design']
        }
    };
    
    const project = projectDetails[projectId];
    
    if (project) {
        // Create modal HTML
        const modal = document.createElement('div');
        modal.classList.add('project-modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-body">
                    <div class="modal-image">
                        <img src="${project.image}" alt="${project.title}">
                    </div>
                    <div class="modal-text">
                        <h2>${project.title}</h2>
                        <p class="modal-description">${project.description}</p>
                        <div class="project-details">
                            <div class="detail-item">
                                <strong>Client:</strong> ${project.client}
                            </div>
                            <div class="detail-item">
                                <strong>Services:</strong> ${project.services.join(', ')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeModal = modal.querySelector('.close-modal');
        closeModal.addEventListener('click', () => {
            modal.remove();
        });
        
        // Close modal when clicking outside content
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modal.remove();
            }
        });
    }
}

// Add modal styles to CSS
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    .project-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .modal-content {
        position: relative;
        background: white;
        border-radius: 10px;
        max-width: 900px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        animation: slideIn 0.3s ease;
    }
    
    @keyframes slideIn {
        from { transform: translateY(-50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    .close-modal {
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 2rem;
        cursor: pointer;
        color: #333;
        z-index: 10;
        background: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .modal-body {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        padding: 2rem;
    }
    
    .modal-image img {
        width: 100%;
        height: auto;
        border-radius: 5px;
        display: block;
    }
    
    .modal-text h2 {
        font-size: 1.8rem;
        margin-bottom: 1rem;
        color: #333;
    }
    
    .modal-description {
        font-size: 1rem;
        line-height: 1.6;
        color: #666;
        margin-bottom: 1.5rem;
    }
    
    .project-details {
        margin-top: 1.5rem;
    }
    
    .detail-item {
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #eee;
    }
    
    .detail-item:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
    }
    
    @media (max-width: 768px) {
        .modal-body {
            grid-template-columns: 1fr;
            gap: 1rem;
            padding: 1.5rem;
        }
        
        .modal-text h2 {
            font-size: 1.5rem;
        }
    }
`;
document.head.appendChild(modalStyle);

// Add focus management for accessibility
document.querySelectorAll('a, button, input, textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #007bff';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});