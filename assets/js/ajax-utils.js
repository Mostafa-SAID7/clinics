/**
 * AJAX Utilities Module
 * Provides reusable AJAX functions for data fetching
 */

'use strict';

const AjaxUtils = (() => {
    /**
     * Default configuration
     */
    const defaultConfig = {
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    /**
     * Make an AJAX GET request
     * @param {string} url - URL to fetch
     * @param {Object} config - Configuration options
     * @returns {Promise<Object>} Response data
     */
    const get = (url, config = {}) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const settings = { ...defaultConfig, ...config };
            
            // Set up event handlers
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        try {
                            const contentType = xhr.getResponseHeader('Content-Type');
                            let data = xhr.responseText;
                            
                            // Auto-parse JSON
                            if (contentType && contentType.includes('application/json')) {
                                data = JSON.parse(xhr.responseText);
                            }
                            
                            resolve({
                                data: data,
                                status: xhr.status,
                                statusText: xhr.statusText,
                                headers: xhr.getAllResponseHeaders()
                            });
                        } catch (error) {
                            reject(new Error('Failed to parse response: ' + error.message));
                        }
                    } else {
                        reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
                    }
                }
            };
            
            xhr.onerror = function() {
                reject(new Error('Network error occurred'));
            };
            
            xhr.ontimeout = function() {
                reject(new Error('Request timeout after ' + settings.timeout + 'ms'));
            };
            
            // Configure request
            xhr.open('GET', url, true);
            xhr.timeout = settings.timeout;
            
            // Set headers
            if (settings.headers) {
                Object.keys(settings.headers).forEach(key => {
                    xhr.setRequestHeader(key, settings.headers[key]);
                });
            }
            
            // Send request
            xhr.send();
        });
    };
    
    /**
     * Make an AJAX POST request
     * @param {string} url - URL to post to
     * @param {Object} data - Data to send
     * @param {Object} config - Configuration options
     * @returns {Promise<Object>} Response data
     */
    const post = (url, data, config = {}) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const settings = { ...defaultConfig, ...config };
            
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        try {
                            const contentType = xhr.getResponseHeader('Content-Type');
                            let responseData = xhr.responseText;
                            
                            if (contentType && contentType.includes('application/json')) {
                                responseData = JSON.parse(xhr.responseText);
                            }
                            
                            resolve({
                                data: responseData,
                                status: xhr.status,
                                statusText: xhr.statusText,
                                headers: xhr.getAllResponseHeaders()
                            });
                        } catch (error) {
                            reject(new Error('Failed to parse response: ' + error.message));
                        }
                    } else {
                        reject(new Error(`HTTP ${xhr.status}: ${xhr.statusText}`));
                    }
                }
            };
            
            xhr.onerror = function() {
                reject(new Error('Network error occurred'));
            };
            
            xhr.ontimeout = function() {
                reject(new Error('Request timeout after ' + settings.timeout + 'ms'));
            };
            
            xhr.open('POST', url, true);
            xhr.timeout = settings.timeout;
            
            // Set headers
            if (settings.headers) {
                Object.keys(settings.headers).forEach(key => {
                    xhr.setRequestHeader(key, settings.headers[key]);
                });
            }
            
            // Send data
            const payload = typeof data === 'object' ? JSON.stringify(data) : data;
            xhr.send(payload);
        });
    };
    
    /**
     * Load JSON file
     * @param {string} url - URL to JSON file
     * @returns {Promise<Object>} Parsed JSON data
     */
    const loadJSON = async (url) => {
        try {
            const response = await get(url);
            return response.data;
        } catch (error) {
            console.error(`Error loading JSON from ${url}:`, error);
            throw error;
        }
    };
    
    /**
     * Load multiple JSON files in parallel
     * @param {Array<string>} urls - Array of URLs
     * @returns {Promise<Array>} Array of parsed JSON data
     */
    const loadMultipleJSON = async (urls) => {
        try {
            const promises = urls.map(url => loadJSON(url));
            return await Promise.all(promises);
        } catch (error) {
            console.error('Error loading multiple JSON files:', error);
            throw error;
        }
    };
    
    /**
     * Check if URL is accessible
     * @param {string} url - URL to check
     * @returns {Promise<boolean>} True if accessible
     */
    const checkURL = (url) => {
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();
            
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    resolve(xhr.status >= 200 && xhr.status < 300);
                }
            };
            
            xhr.onerror = function() {
                resolve(false);
            };
            
            xhr.open('HEAD', url, true);
            xhr.timeout = 5000;
            xhr.send();
        });
    };
    
    return {
        get,
        post,
        loadJSON,
        loadMultipleJSON,
        checkURL
    };
})();
