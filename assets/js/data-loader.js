/**
 * Data Loader Module
 * Handles loading and caching of data.json using AJAX
 */

'use strict';

const DataLoader = (() => {
    let cachedData = null;
    // Detect if we're in root or pages folder
    const isInPages = window.location.pathname.includes('/pages/');
    const DATA_PATH = isInPages ? '../data/data.json' : 'data/data.json';
    
    /**
     * Fetch data from JSON file using AJAX
     * @returns {Promise<Object>} Data object
     */
    const fetchData = async () => {
        if (cachedData) {
            return cachedData;
        }
        
        try {
            // Use AjaxUtils if available, otherwise fallback to XMLHttpRequest
            if (typeof AjaxUtils !== 'undefined') {
                cachedData = await AjaxUtils.loadJSON(DATA_PATH);
            } else {
                // Fallback XMLHttpRequest
                cachedData = await new Promise((resolve, reject) => {
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
                    xhr.open('GET', DATA_PATH, true);
                    xhr.timeout = 10000;
                    xhr.send();
                });
            }
            
            console.log('✓ Data loaded successfully via AJAX');
            return cachedData;
        } catch (error) {
            console.error('✗ Error loading data:', error);
            return null;
        }
    };
    
    /**
     * Get site information
     * @returns {Promise<Object>} Site data
     */
    const getSiteInfo = async () => {
        const data = await fetchData();
        return data?.site || {};
    };
    
    /**
     * Get services
     * @returns {Promise<Array>} Services array
     */
    const getServices = async () => {
        const data = await fetchData();
        return data?.services || [];
    };
    
    /**
     * Get doctors
     * @returns {Promise<Array>} Doctors array
     */
    const getDoctors = async () => {
        const data = await fetchData();
        return data?.doctors || [];
    };
    
    /**
     * Get departments
     * @returns {Promise<Array>} Departments array
     */
    const getDepartments = async () => {
        const data = await fetchData();
        return data?.departments || [];
    };
    
    /**
     * Get stats
     * @returns {Promise<Array>} Stats array
     */
    const getStats = async () => {
        const data = await fetchData();
        return data?.stats || [];
    };
    
    /**
     * Get testimonials
     * @returns {Promise<Array>} Testimonials array
     */
    const getTestimonials = async () => {
        const data = await fetchData();
        return data?.testimonials || [];
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
        populateFooter
    };
})();
