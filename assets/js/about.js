/**
 * About Page Script
 */

'use strict';

(async () => {
    const statsGrid = document.getElementById('statsGrid');
    
    if (statsGrid) {
        try {
            const stats = await DataLoader.getStats();
            
            statsGrid.innerHTML = stats.map(stat => `
                <div class="stat-item">
                    <div class="stat-item__value">${stat.value}</div>
                    <div class="stat-item__label">${stat.label}</div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    }
    
    await DataLoader.populateFooter();
})();
