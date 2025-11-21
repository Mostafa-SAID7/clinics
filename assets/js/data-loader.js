/**
 * Data Loader Module
 * Handles loading and caching of data.json using AJAX
 */

'use strict';

const DataLoader = (() => {
    let cachedData = {};
    // Detect if we're in root or pages folder
    const isInPages = window.location.pathname.includes('/pages/');
    const DATA_BASE_PATH = isInPages ? '../data' : 'data';
    
    /**
     * Get data path for current language and file type
     * @param {string} type - Type of data (site, services, doctors, etc.)
     * @returns {string} Path to data file
     */
    const getDataPath = (type) => {
        const currentLang = localStorage.getItem('clinichub_lang') || 'en';
        return `${DATA_BASE_PATH}/${currentLang}/${type}.json`;
    };
    
    /**
     * Fetch data from JSON file using AJAX
     * @param {string} type - Type of data to fetch
     * @param {boolean} forceReload - Force reload data
     * @returns {Promise<Object|Array>} Data object or array
     */
    const fetchData = async (type, forceReload = false) => {
        const currentLang = localStorage.getItem('clinichub_lang') || 'en';
        const cacheKey = `${currentLang}_${type}`;
        
        // Return cached data if available and not forcing reload
        if (cachedData[cacheKey] && !forceReload) {
            return cachedData[cacheKey];
        }
        
        try {
            const dataPath = getDataPath(type);
            
            // Use AjaxUtils if available, otherwise fallback to XMLHttpRequest
            if (typeof AjaxUtils !== 'undefined') {
                cachedData[cacheKey] = await AjaxUtils.loadJSON(dataPath);
            } else {
                // Fallback XMLHttpRequest
                cachedData[cacheKey] = await new Promise((resolve, reject) => {
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
                    xhr.open('GET', dataPath, true);
                    xhr.timeout = 10000;
                    xhr.send();
                });
            }
            
            console.log(`✓ ${type} data loaded successfully for ${currentLang} via AJAX`);
            return cachedData[cacheKey];
        } catch (error) {
            console.error(`✗ Error loading ${type} data:`, error);
            return null;
        }
    };
    
    /**
     * Clear cached data (useful when switching languages)
     */
    const clearCache = () => {
        cachedData = {};
    };
    
    /**
     * Get site information
     * @returns {Promise<Object>} Site data
     */
    const getSiteInfo = async () => {
        const data = await fetchData('site');
        return data || {};
    };
    
    /**
     * Get services
     * @returns {Promise<Array>} Services array
     */
    const getServices = async () => {
        const data = await fetchData('services');
        return data || [];
    };
    
    /**
     * Get doctors
     * @returns {Promise<Array>} Doctors array
     */
    const getDoctors = async () => {
        const data = await fetchData('doctors');
        return data || [];
    };
    
    /**
     * Get departments
     * @returns {Promise<Array>} Departments array
     */
    const getDepartments = async () => {
        const data = await fetchData('departments');
        return data || [];
    };
    
    /**
     * Get stats
     * @returns {Promise<Array>} Stats array
     */
    const getStats = async () => {
        const data = await fetchData('stats');
        return data || [];
    };
    
    /**
     * Get testimonials
     * @returns {Promise<Array>} Testimonials array
     */
    const getTestimonials = async () => {
        const data = await fetchData('testimonials');
        return data || [];
    };
    
    /**
     * Get about information
     * @returns {Promise<Object>} About data
     */
    const getAbout = async () => {
        const data = await fetchData('about');
        return data || {};
    };
    
    /**
     * Populate footer with site data
     */
    const populateFooter = async () => {
        const siteInfo = await getSiteInfo();
        
        const footerTitle = document.getElementById('footerTitle');
        const footerDescription = document.getElementById('footerDescription');
        const footerContact = document.getElementById('footerContact');
        const footerHours = document.getElementById('footerHours');
        
        if (footerTitle) footerTitle.textContent = siteInfo.name || 'ClinicHub';
        if (footerDescription) footerDescription.textContent = siteInfo.description || '';
        
        if (footerContact && siteInfo.contact) {
            footerContact.innerHTML = `
                <li>Email: ${siteInfo.contact.email}</li>
                <li>Phone: ${siteInfo.contact.phone}</li>
                <li>Address: ${siteInfo.contact.address}</li>
            `;
        }
        
        if (footerHours && siteInfo.hours) {
            footerHours.innerHTML = `
                <li>${siteInfo.hours.weekdays}</li>
                <li>${siteInfo.hours.saturday}</li>
                <li>${siteInfo.hours.sunday}</li>
            `;
        }
    };
    
    return {
        getSiteInfo,
        getServices,
        getDoctors,
        getDepartments,
        getStats,
        getTestimonials,
        getAbout,
        populateFooter,
        clearCache,
        fetchData
    };
})();
