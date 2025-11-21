/**
 * Theme Module
 * Handles light/dark mode with localStorage
 */

'use strict';

const Theme = (() => {
    let currentTheme = localStorage.getItem('clinichub_theme') || 'light';
    
    /**
     * Set theme
     * @param {string} theme - Theme name (light, dark)
     */
    const setTheme = (theme) => {
        currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('clinichub_theme', theme);
        updateThemeIcon();
    };
    
    /**
     * Toggle theme
     */
    const toggleTheme = () => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        return newTheme;
    };
    
    /**
     * Get current theme
     * @returns {string} Current theme
     */
    const getCurrentTheme = () => currentTheme;
    
    /**
     * Update theme icon
     */
    const updateThemeIcon = () => {
        const themeBtn = document.querySelector('.theme-btn');
        if (themeBtn) {
            const icon = themeBtn.querySelector('i');
            if (icon) {
                icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
            themeBtn.setAttribute('aria-label', currentTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
            themeBtn.setAttribute('title', currentTheme === 'light' ? 'Dark mode' : 'Light mode');
        }
    };
    
    /**
     * Initialize theme
     */
    const init = () => {
        setTheme(currentTheme);
        
        // Add theme toggle button click handler
        const themeBtn = document.querySelector('.theme-btn');
        if (themeBtn) {
            themeBtn.addEventListener('click', toggleTheme);
        }
    };
    
    return {
        init,
        setTheme,
        toggleTheme,
        getCurrentTheme
    };
})();
