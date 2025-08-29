/**
 * Main JavaScript for diaas Website
 */

class diaasWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupNavigation();
        this.setupScrollEffects();
        this.initializeAnimations();
    }

    setupEventListeners() {
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('load', () => this.handleLoad());
    }

    handleScroll() {
        this.updateNavigation();
        this.animateOnScroll();
    }

    updateNavigation() {
        const navbar = document.getElementById('mainNav');
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    setupNavigation() {
        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 100;
                    const elementPosition = targetElement.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupScrollEffects() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        const animatableElements = document.querySelectorAll('.stat-card, .benefit-card, .offering-card, .insight-card, .testimonial-card');
        animatableElements.forEach(element => {
            observer.observe(element);
        });
    }

    initializeAnimations() {
        // Add entrance animations
        const style = document.createElement('style');
        style.textContent = `
            .stat-card, .benefit-card, .offering-card, .insight-card, .testimonial-card {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease-out;
            }
            
            .stat-card.animate, .benefit-card.animate, .offering-card.animate, 
            .insight-card.animate, .testimonial-card.animate {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }

    handleLoad() {
        // Initialize any load-dependent features
        console.log('diaas Website loaded successfully');
    }
}

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    new diaasWebsite();
});


// Enhanced globe animations
class GlobeAnimations {
    constructor() {
        this.globeContainer = document.querySelector('.globe-container');
        this.init();
    }

    init() {
        this.setupScrollTrigger();
        this.setupHoverEffects();
    }

    setupScrollTrigger() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    this.startGlobeAnimations();
                }
            });
        }, { threshold: 0.3 });

        if (this.globeContainer) {
            observer.observe(this.globeContainer);
        }
    }

    setupHoverEffects() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform += ' scale(1.2)';
                element.style.animationPlayState = 'paused';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = element.style.transform.replace(' scale(1.2)', '');
                element.style.animationPlayState = 'running';
            });
        });
    }

    startGlobeAnimations() {
        // Add pulsing effect to globe dots
        const dots = document.querySelectorAll('.globe-svg circle[r="3"]');
        dots.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.animation = `pulse 2s ease-in-out infinite`;
            }, index * 200);
        });
    }
}

// Initialize globe animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GlobeAnimations();
});
