/**
 * Internationalization Module
 * Handles multi-language support with localStorage
 */

'use strict';

const I18n = (() => {
    let translations = {};
    let currentLang = localStorage.getItem('clinichub_lang') || 'en';
    // Detect if we're in root or pages folder
    const isInPages = window.location.pathname.includes('/pages/');
    const TRANSLATIONS_PATH = isInPages ? '../data/translations.json' : 'data/translations.json';
    
    /**
     * Load translations from JSON file using AJAX
     */
    const loadTranslations = async () => {
        try {
            // Use AjaxUtils if available, otherwise fallback to XMLHttpRequest
            if (typeof AjaxUtils !== 'undefined') {
                translations = await AjaxUtils.loadJSON(TRANSLATIONS_PATH);
            } else {
                // Fallback XMLHttpRequest
                translations = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200) {
                                try {
                                    resolve(JSON.parse(xhr.responseText));
                                } catch (error) {
                                    reject(new Error('Failed to parse JSON: ' + error.message));
                                }
                            } else {
                                reject(new Error(`HTTP error! status: ${xhr.status}`));
                            }
                        }
                    };
                    xhr.onerror = () => reject(new Error('Network error'));
                    xhr.open('GET', TRANSLATIONS_PATH, true);
                    xhr.timeout = 10000;
                    xhr.send();
                });
            }
            
            console.log('✓ Translations loaded successfully via AJAX');
            return translations;
        } catch (error) {
            console.error('✗ Error loading translations:', error);
            return null;
        }
    };
    
    /**
     * Get translation by key path
     * @param {string} key - Dot notation key (e.g., 'nav.services')
     * @returns {string} Translated text
     */
    const t = (key) => {
        const keys = key.split('.');
        let value = translations[currentLang];
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return key;
            }
        }
        
        return value;
    };
    
    /**
     * Set current language
     * @param {string} lang - Language code (en, ar)
     */
    const setLanguage = (lang) => {
        currentLang = lang;
        localStorage.setItem('clinichub_lang', lang);
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    };
    
    /**
     * Get current language
     * @returns {string} Current language code
     */
    const getCurrentLanguage = () => currentLang;
    
    /**
     * Toggle between languages
     */
    const toggleLanguage = () => {
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        setLanguage(newLang);
        return newLang;
    };
    
    /**
     * Update page content with translations
     */
    const updatePageContent = () => {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = t(key);
            
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else if (element.tagName === 'OPTION') {
                element.textContent = translation;
            } else {
                element.textContent = translation;
            }
        });
        
        // Update all elements with data-i18n-html attribute
        document.querySelectorAll('[data-i18n-html]').forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            element.innerHTML = t(key);
        });
        
        // Update placeholders with data-i18n-placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = t(key);
        });
        
        // Update title attributes
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.setAttribute('title', t(key));
        });
    };
    
    /**
     * Initialize i18n
     */
    const init = async () => {
        await loadTranslations();
        setLanguage(currentLang);
        updatePageContent();
    };
    
    return {
        init,
        t,
        setLanguage,
        getCurrentLanguage,
        toggleLanguage,
        updatePageContent
    };
})();
