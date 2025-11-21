/**
 * Page Loader Module
 * Handles initial page loading progress bar and skeleton loaders
 */

'use strict';

const PageLoader = (() => {
    let progressValue = 0;
    let progressInterval = null;
    
    /**
     * Create and inject page loader HTML
     */
    const createLoader = () => {
        const loaderHTML = `
            <div class="page-loader" id="pageLoader">
                <div class="page-loader__content">
                    <div class="page-loader__logo">
                        <svg width="80" height="80" viewBox="0 0 32 32" fill="none">
                            <rect x="14" y="8" width="4" height="16" fill="currentColor"/>
                            <rect x="8" y="14" width="16" height="4" fill="currentColor"/>
                        </svg>
                        <div>ClinicHub</div>
                    </div>
                    <p class="page-loader__text">Loading your healthcare experience...</p>
                    <div class="page-loader__progress">
                        <div class="page-loader__bar" id="progressBar"></div>
                    </div>
                    <div class="page-loader__percentage" id="progressPercentage">0%</div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', loaderHTML);
    };
    
    /**
     * Update progress bar
     * @param {number} value - Progress value (0-100)
     */
    const updateProgress = (value) => {
        progressValue = Math.min(value, 100);
        const progressBar = document.getElementById('progressBar');
        const progressPercentage = document.getElementById('progressPercentage');
        
        if (progressBar) {
            progressBar.style.width = `${progressValue}%`;
        }
        
        if (progressPercentage) {
            progressPercentage.textContent = `${Math.round(progressValue)}%`;
        }
    };
    
    /**
     * Simulate progressive loading
     */
    const simulateProgress = () => {
        progressInterval = setInterval(() => {
            if (progressValue < 90) {
                // Slow down as we approach 90%
                const increment = progressValue < 50 ? 10 : progressValue < 70 ? 5 : 2;
                updateProgress(progressValue + increment);
            }
        }, 200);
    };
    
    /**
     * Complete loading and hide loader
     */
    const complete = () => {
        if (progressInterval) {
            clearInterval(progressInterval);
        }
        
        // Jump to 100%
        updateProgress(100);
        
        // Hide loader after a short delay
        setTimeout(() => {
            const loader = document.getElementById('pageLoader');
            if (loader) {
                loader.classList.add('hidden');
                
                // Remove from DOM after transition
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }
            
            // Mark content as loaded
            document.body.classList.add('content-loaded');
        }, 300);
    };
    
    /**
     * Initialize page loader
     */
    const init = () => {
        // Only show on first page load
        if (sessionStorage.getItem('clinichub_loaded')) {
            return;
        }
        
        createLoader();
        simulateProgress();
        
        // Mark as loaded for this session
        sessionStorage.setItem('clinichub_loaded', 'true');
    };
    
    /**
     * Force show loader (for testing or specific pages)
     */
    const show = () => {
        createLoader();
        simulateProgress();
    };
    
    /**
     * Hide loader immediately
     */
    const hide = () => {
        if (progressInterval) {
            clearInterval(progressInterval);
        }
        
        const loader = document.getElementById('pageLoader');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500);
        }
    };
    
    return {
        init,
        show,
        hide,
        complete,
        updateProgress
    };
})();

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        PageLoader.init();
    });
} else {
    PageLoader.init();
}
