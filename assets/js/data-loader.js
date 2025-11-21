/**
 * Data Loader Module
 * Handles loading and caching of data.json
 */

'use strict';

const DataLoader = (() => {
    let cachedData = null;
    const DATA_PATH = '../data/data.json';
    
    /**
     * Fetch data from JSON file
     * @returns {Promise<Object>} Data object
     */
    const fetchData = async () => {
        if (cachedData) {
            return cachedData;
        }
        
        try {
            const response = await fetch(DATA_PATH);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            cachedData = await response.json();
            return cachedData;
        } catch (error) {
            console.error('Error loading data:', error);
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
