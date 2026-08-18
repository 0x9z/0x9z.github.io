// Zero Portfolio JavaScript - Highly Optimized & Performance-Focused

'use strict';

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeTheme();
        this.initializeNavigation();
        this.initializeExperienceCards();
        this.initializeAnimations();
        this.initializeIntersectionObserver();
        this.initializeContactForm();
        this.initializePerformanceOptimizations();
        
        // Remove loading screen once everything is ready
        this.removeLoadingScreen();
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', this.toggleTheme.bind(this));
        }

        // Navigation toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => this.toggleNavigation(navToggle, navMenu));
        }

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e, navMenu, navToggle));
        });

        // Back to top button
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            backToTop.addEventListener('click', this.scrollToTop);
        }

        // Scroll events (throttled) - use passive for better scroll performance
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16), { passive: true });
        
        // Resize events (debounced) - use passive for better performance
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250), { passive: true });

        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));
    }

    // Theme Management
    initializeTheme() {
        const savedTheme = localStorage.getItem('zero-theme') || 'light';
        this.setTheme(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('zero-theme', theme);
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }

        // Announce theme change for accessibility
        this.announceToScreenReader(`Switched to ${theme} theme`);
    }

    // Navigation Management
    initializeNavigation() {
        this.updateActiveNavLink();
    }

    toggleNavigation(navToggle, navMenu) {
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            this.closeNavigation(navToggle, navMenu);
        } else {
            this.openNavigation(navToggle, navMenu);
        }
    }

    openNavigation(navToggle, navMenu) {
        navMenu.classList.add('active');
        navToggle.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        
        // Focus management
        const firstNavLink = navMenu.querySelector('.nav-link');
        if (firstNavLink) firstNavLink.focus();
    }

    closeNavigation(navToggle, navMenu) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    handleNavClick(e, navMenu, navToggle) {
        const href = e.target.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Close mobile menu
                this.closeNavigation(navToggle, navMenu);
                
                // Smooth scroll to target
                this.smoothScrollTo(targetElement);
                
                // Update active nav link
                this.setActiveNavLink(e.target);
            }
        }
    }

    smoothScrollTo(element) {
        const headerHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    setActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    initializeExperienceCards() {
        const cards = Array.from(document.querySelectorAll('.xp-card'));
        if (!cards.length) return;

        const setCardState = (card, expanded) => {
            const button = card.querySelector('.xp-card__header');
            const panel = card.querySelector('.xp-card__panel');
            if (!button || !panel) return;

            card.classList.toggle('is-active', expanded);
            button.setAttribute('aria-expanded', String(expanded));
            panel.setAttribute('aria-hidden', String(!expanded));
        };

        const closeAll = (exceptCard) => {
            cards.forEach((card) => {
                if (card !== exceptCard) {
                    setCardState(card, false);
                }
            });
        };

        cards.forEach((card) => {
            const button = card.querySelector('.xp-card__header');
            if (!button) return;

            setCardState(card, false);

            button.addEventListener('click', () => {
                const isOpen = card.classList.contains('is-active');
                closeAll(card);
                setCardState(card, !isOpen);
            });

            button.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && card.classList.contains('is-active')) {
                    setCardState(card, false);
                    button.focus();
                }
            });
        });
    }

    // Animation Management
    initializeAnimations() {
        // Initialize progress bars
        this.initializeProgressBars();
        
        // Add stagger animation delays
        this.addStaggerAnimations();
    }

    initializeProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            if (progress) {
                // Animate progress bar when it comes into view
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                bar.style.width = `${progress}%`;
                            }, 200);
                            observer.unobserve(entry.target);
                        }
                    });
                });
                observer.observe(bar);
            }
        });
    }

    addStaggerAnimations() {
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach((element) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }

    // Intersection Observer for Performance
    initializeIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animated elements
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach(element => {
            this.observer.observe(element);
        });
    }

    animateElement(element) {
        const delay = element.getAttribute('data-aos-delay') || 0;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.classList.add('animate-fadeInUp');
        }, parseInt(delay));
    }

    // Contact Form Management
    initializeContactForm() {
        // Initialize character counter
        this.initializeCharacterCounter();
        
        // Real-time validation
        const formInputs = document.querySelectorAll('#contact-form input, #contact-form textarea, #contact-form select');
        formInputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
        
        // Form submission
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
    }

    initializeCharacterCounter() {
        const messageField = document.getElementById('message');
        const charCountElement = document.getElementById('char-count');
        
        if (messageField && charCountElement) {
            messageField.addEventListener('input', () => {
                const currentLength = messageField.value.length;
                charCountElement.textContent = currentLength;
                
                // Color coding based on character count
                if (currentLength > 900) {
                    charCountElement.style.color = '#ef4444';
                } else if (currentLength > 800) {
                    charCountElement.style.color = '#f59e0b';
                } else {
                    charCountElement.style.color = '#6b7280';
                }
            });
        }
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        this.clearFieldError(field);

        // Validation rules
        switch (fieldName) {
            case 'name':
                if (!value) {
                    errorMessage = 'Name is required';
                    isValid = false;
                } else if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters';
                    isValid = false;
                } else if (value.length > 50) {
                    errorMessage = 'Name must be less than 50 characters';
                    isValid = false;
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    errorMessage = 'Email is required';
                    isValid = false;
                } else if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;

            case 'company':
                if (value.length > 100) {
                    errorMessage = 'Company name must be less than 100 characters';
                    isValid = false;
                }
                break;

            case 'subject':
                if (!value) {
                    errorMessage = 'Please select a subject';
                    isValid = false;
                }
                break;

            case 'message':
                if (!value) {
                    errorMessage = 'Message is required';
                    isValid = false;
                } else if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters';
                    isValid = false;
                } else if (value.length > 1000) {
                    errorMessage = 'Message must be less than 1000 characters';
                    isValid = false;
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        field.style.borderColor = '#ef4444';
    }

    clearFieldError(field) {
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        field.style.borderColor = '';
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitButton = form.querySelector('.form-submit');
        const statusElement = document.getElementById('form-status');
        
        // Validate all fields
        const formInputs = form.querySelectorAll('input, textarea');
        let isFormValid = true;
        
        formInputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.showFormStatus('Please fix the errors above', 'error');
            return;
        }
        
        // Show loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await this.simulateFormSubmission(new FormData(form));
            
            // Success
            this.showFormStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            
            // Analytics tracking (if implemented)
            this.trackFormSubmission();
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormStatus('Something went wrong. Please try again later.', 'error');
        } finally {
            // Reset button state
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    }

    simulateFormSubmission(formData) {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                // 90% success rate for demo
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }

    showFormStatus(message, type) {
        const statusElement = document.getElementById('form-status');
        if (statusElement) {
            statusElement.textContent = message;
            statusElement.className = `form-status ${type}`;
            statusElement.style.display = 'block';
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                statusElement.style.display = 'none';
            }, 5000);
        }
    }

    // Scroll Event Handlers
    handleScroll() {
        this.updateActiveNavLink();
        this.updateBackToTopButton();
        this.updateNavbarAppearance();
    }

    updateBackToTopButton() {
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    }

    updateNavbarAppearance() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'var(--bg-overlay)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'var(--bg-overlay)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Resize Handler
    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth >= 768) {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            if (navMenu && navToggle) {
                this.closeNavigation(navToggle, navMenu);
            }
        }
    }

    // Keyboard Navigation
    handleKeyboardNavigation(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            if (navMenu && navToggle && navMenu.classList.contains('active')) {
                this.closeNavigation(navToggle, navMenu);
                navToggle.focus();
            }
        }
        
        // Alt + T for theme toggle
        if (e.altKey && e.key === 't') {
            e.preventDefault();
            this.toggleTheme();
        }
    }

    // Performance Optimizations
    initializePerformanceOptimizations() {
        // Lazy load images
        this.lazyLoadImages();
        
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Initialize Web Vitals tracking
        this.initializeWebVitals();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    preloadCriticalResources() {
        // Preload hero image if it exists
        const heroImage = document.querySelector('.hero-image img');
        if (heroImage && heroImage.dataset.src) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = heroImage.dataset.src;
            document.head.appendChild(link);
        }
    }

    initializeWebVitals() {
        // Monitor Core Web Vitals (LCP, FID, CLS)
        const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        
        if ('PerformanceObserver' in window) {
            try {
                // Largest Contentful Paint
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    if (isDev) console.log('LCP:', lastEntry.startTime);
                }).observe({ type: 'largest-contentful-paint', buffered: true });

                // First Input Delay
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        if (isDev) console.log('FID:', entry.processingStart - entry.startTime);
                    });
                }).observe({ type: 'first-input', buffered: true });

                // Cumulative Layout Shift
                new PerformanceObserver((list) => {
                    let clsValue = 0;
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    });
                    if (isDev) console.log('CLS:', clsValue);
                }).observe({ type: 'layout-shift', buffered: true });
            } catch (e) {
                // PerformanceObserver not supported for this entry type
            }
        }
    }

    // Utility Functions
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait) {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    trackFormSubmission() {
        // Analytics tracking placeholder
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submit', {
                event_category: 'contact',
                event_label: 'zero_portfolio_contact_form'
            });
        }
    }

    removeLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            // Use requestIdleCallback for non-critical removal, or setTimeout as fallback
            const removeLoader = () => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            };
            
            if ('requestIdleCallback' in window) {
                requestIdleCallback(removeLoader, { timeout: 1000 });
            } else {
                setTimeout(removeLoader, 500);
            }
        }
    }
}

// Enhanced Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// Initialize the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PortfolioApp();
    });
} else {
    new PortfolioApp();
}

// Google Analytics Enhanced Tracking
class AnalyticsTracker {
    constructor() {
        this.init();
    }

    init() {
        if (typeof gtag !== 'undefined') {
            this.setupEventTracking();
        }
    }

    setupEventTracking() {
        // Track navigation clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const section = e.target.getAttribute('href').substring(1);
                this.trackEvent('navigation_click', {
                    section_name: section,
                    link_text: e.target.textContent
                });
            });
        });

        // Track contact button clicks
        document.querySelectorAll('.contact-link, .btn[href*="mailto"], .btn[href*="tel"]').forEach(button => {
            button.addEventListener('click', (e) => {
                const href = e.currentTarget.href || '';
                const contactType = href.includes('mailto') ? 'email' : 
                                  href.includes('tel') ? 'phone' : 'contact';
                this.trackEvent('contact_interaction', {
                    contact_method: contactType,
                    button_text: e.currentTarget.textContent?.trim() || ''
                });
            });
        });

        // Track social media clicks
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = e.currentTarget.href || '';
                const platform = href.includes('linkedin') ? 'linkedin' : 
                               href.includes('github') ? 'github' : 
                               href.includes('medium') ? 'medium' :
                               href.includes('dev.to') ? 'devto' :
                               href.includes('twitter') ? 'twitter' : 'social';
                this.trackEvent('social_click', {
                    platform: platform,
                    outbound: true
                });
            });
        });

        // Track project interactions
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                const projectTitle = card.querySelector('h3')?.textContent || 'Unknown Project';
                this.trackEvent('project_view', {
                    project_name: projectTitle
                });
            });
        });

        // Track skill card interactions
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                const skillName = card.querySelector('h3')?.textContent || 'Unknown Skill';
                this.trackEvent('skill_hover', {
                    skill_name: skillName
                });
            });
        });

        // Track theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                this.trackEvent('theme_toggle', {
                    from_theme: currentTheme,
                    to_theme: newTheme
                });
            });
        }

        // Track scroll depth
        this.trackScrollDepth();

        // Track time on page
        this.trackTimeOnPage();
    }

    trackEvent(eventName, parameters = {}) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                ...parameters,
                timestamp: new Date().toISOString()
            });
        }
    }

    trackScrollDepth() {
        const scrollDepths = [25, 50, 75, 90];
        const trackedDepths = new Set();

        window.addEventListener('scroll', this.throttle(() => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );

            scrollDepths.forEach(depth => {
                if (scrollPercent >= depth && !trackedDepths.has(depth)) {
                    trackedDepths.add(depth);
                    this.trackEvent('scroll_depth', {
                        scroll_depth: depth,
                        page_height: document.documentElement.scrollHeight
                    });
                }
            });
        }, 500));
    }

    trackTimeOnPage() {
        const startTime = Date.now();
        
        const intervals = [30, 60, 120, 300];
        const trackedIntervals = new Set();

        const trackInterval = () => {
            const timeOnPage = Math.round((Date.now() - startTime) / 1000);
            
            intervals.forEach(interval => {
                if (timeOnPage >= interval && !trackedIntervals.has(interval)) {
                    trackedIntervals.add(interval);
                    this.trackEvent('time_on_page', {
                        time_threshold: interval,
                        total_time: timeOnPage
                    });
                }
            });
        };

        setInterval(trackInterval, 10000);

        window.addEventListener('beforeunload', () => {
            const totalTime = Math.round((Date.now() - startTime) / 1000);
            this.trackEvent('page_exit', {
                total_time_on_page: totalTime
            });
        });
    }

    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
}

// Initialize Analytics Tracking
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new AnalyticsTracker();
    });
} else {
    new AnalyticsTracker();
}

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioApp, AnalyticsTracker };
}