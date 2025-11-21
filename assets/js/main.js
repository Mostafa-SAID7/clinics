/**
 * ClinicHub - Main JavaScript
 * Production-grade vanilla JavaScript ES6+
 * @author ClinicHub Development Team
 */

'use strict';

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Debounce function to limit function execution rate
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
const debounce = (func, wait = 300) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type of toast (success, error, info)
 * @param {number} duration - Duration in milliseconds
 */
const showToast = (message, type = 'info', duration = 3000) => {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
};

// ===================================
// NAVIGATION MODULE
// ===================================
const Navigation = (() => {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    /**
     * Toggle mobile navigation menu
     */

    const toggleMenu = () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
    };
    
    /**
     * Close menu when clicking on a link
     */
    const closeMenuOnClick = () => {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    };
    
    /**
     * Handle smooth scroll to sections
     * @param {Event} e - Click event
     */
    const handleSmoothScroll = (e) => {
        const href = e.currentTarget.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                closeMenuOnClick();
            }
        }
    };
    
    /**
     * Initialize navigation
     */
    const init = () => {
        if (navToggle) {
            navToggle.addEventListener('click', toggleMenu);
        }
        
        navLinks.forEach(link => {
            link.addEventListener('click', handleSmoothScroll);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav') && navMenu.classList.contains('active')) {
                closeMenuOnClick();
            }
        });
    };
    
    return { init };
})();

// ===================================
// FORM VALIDATION MODULE
// ===================================
const FormValidation = (() => {
    const form = document.getElementById('appointmentForm');
    
    /**
     * Validation rules for form fields
     */
    const validationRules = {
        fullName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Please enter a valid name (letters only, minimum 2 characters)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        phone: {
            required: true,
            pattern: /^[\d\s\-\+\(\)]+$/,
            minLength: 10,
            message: 'Please enter a valid phone number (minimum 10 digits)'
        },
        date: {
            required: true,
            validate: (value) => {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return selectedDate >= today;
            },
            message: 'Please select a future date'
        },
        department: {
            required: true,
            message: 'Please select a department'
        }
    };

    /**
     * Validate a single field
     * @param {HTMLElement} field - Input field to validate
     * @returns {boolean} Validation result
     */
    const validateField = (field) => {
        const fieldName = field.name;
        const fieldValue = field.value.trim();
        const rules = validationRules[fieldName];
        const errorElement = field.nextElementSibling;
        
        if (!rules) return true;
        
        // Clear previous error
        field.classList.remove('error');
        if (errorElement && errorElement.classList.contains('form-error')) {
            errorElement.textContent = '';
        }
        
        // Required validation
        if (rules.required && !fieldValue) {
            showError(field, errorElement, 'This field is required');
            return false;
        }
        
        // Skip other validations if field is empty and not required
        if (!fieldValue) return true;
        
        // Min length validation
        if (rules.minLength && fieldValue.length < rules.minLength) {
            showError(field, errorElement, rules.message);
            return false;
        }
        
        // Pattern validation
        if (rules.pattern && !rules.pattern.test(fieldValue)) {
            showError(field, errorElement, rules.message);
            return false;
        }
        
        // Custom validation function
        if (rules.validate && !rules.validate(fieldValue)) {
            showError(field, errorElement, rules.message);
            return false;
        }
        
        return true;
    };
    
    /**
     * Show error message for a field
     * @param {HTMLElement} field - Input field
     * @param {HTMLElement} errorElement - Error message element
     * @param {string} message - Error message
     */
    const showError = (field, errorElement, message) => {
        field.classList.add('error');
        if (errorElement && errorElement.classList.contains('form-error')) {
            errorElement.textContent = message;
        }
    };
    
    /**
     * Handle form submission
     * @param {Event} e - Submit event
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        let isValid = true;
        
        // Validate all fields
        for (const [fieldName] of formData.entries()) {
            const field = form.elements[fieldName];
            if (field && !validateField(field)) {
                isValid = false;
            }
        }
        
        if (isValid) {
            // Simulate form submission
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Booking...';
            
            // Simulate API call
            setTimeout(() => {
                showToast('Appointment booked successfully! We will contact you soon.', 'success', 4000);
                form.reset();
                submitButton.disabled = false;
                submitButton.textContent = 'Book Appointment';
            }, 1500);
        } else {
            showToast('Please fix the errors in the form', 'error');
        }
    };

    /**
     * Initialize form validation
     */
    const init = () => {
        if (!form) return;
        
        // Add real-time validation on blur
        const fields = form.querySelectorAll('.form-input');
        fields.forEach(field => {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', debounce(() => validateField(field), 500));
        });
        
        // Handle form submission
        form.addEventListener('submit', handleSubmit);
        
        // Set minimum date for date input to today
        const dateInput = form.querySelector('#date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
    };
    
    return { init };
})();

// ===================================
// SCROLL ANIMATIONS MODULE
// ===================================
const ScrollAnimations = (() => {
    /**
     * Intersection Observer callback
     * @param {IntersectionObserverEntry[]} entries - Observed entries
     */
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    };
    
    /**
     * Initialize scroll animations
     */
    const init = () => {
        // Check if Intersection Observer is supported
        if (!('IntersectionObserver' in window)) return;
        
        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });
        
        // Observe doctor cards
        const doctorCards = document.querySelectorAll('.doctor-card');
        doctorCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });
    };
    
    return { init };
})();

// ===================================
// HEADER SCROLL EFFECT MODULE
// ===================================
const HeaderScroll = (() => {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    /**
     * Handle scroll event
     */
    const handleScroll = () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }
        
        lastScroll = currentScroll;
    };
    
    /**
     * Initialize header scroll effect
     */
    const init = () => {
        if (!header) return;
        window.addEventListener('scroll', debounce(handleScroll, 10));
    };
    
    return { init };
})();

// ===================================
// APPLICATION INITIALIZATION
// ===================================
const App = (() => {
    /**
     * Initialize all modules
     */
    const init = () => {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initModules);
        } else {
            initModules();
        }
    };
    
    /**
     * Initialize all application modules
     */
    const initModules = () => {
        try {
            Navigation.init();
            FormValidation.init();
            ScrollAnimations.init();
            HeaderScroll.init();
            
            console.log('ClinicHub application initialized successfully');
        } catch (error) {
            console.error('Error initializing application:', error);
        }
    };
    
    return { init };
})();

// Start the application
App.init();
