/**
 * Services Page Script
 */

'use strict';

(async () => {
    const servicesGrid = document.getElementById('servicesGrid');
    
    if (!servicesGrid) return;
    
    const iconMap = {
        consultation: '<rect x="20" y="12" width="8" height="24" fill="currentColor"/><rect x="12" y="20" width="24" height="8" fill="currentColor"/>',
        diagnostic: '<circle cx="24" cy="24" r="12" stroke="currentColor" stroke-width="4" fill="none"/>',
        specialized: '<path d="M24 12L28 20H36L30 26L32 34L24 28L16 34L18 26L12 20H20L24 12Z" fill="currentColor"/>',
        telemedicine: '<rect x="16" y="12" width="16" height="24" rx="2" stroke="currentColor" stroke-width="4" fill="none"/>',
        emergency: '<path d="M24 8L28 20L40 20L30 28L34 40L24 32L14 40L18 28L8 20L20 20Z" fill="currentColor"/>',
        preventive: '<circle cx="24" cy="24" r="16" stroke="currentColor" stroke-width="4" fill="none"/><path d="M16 24L22 30L32 18" stroke="currentColor" stroke-width="4" fill="none"/>'
    };
    
    try {
        const services = await DataLoader.getServices();
        
        servicesGrid.innerHTML = services.map(service => `
            <article class="service-card">
                <div class="service-card__icon" aria-hidden="true">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        ${iconMap[service.icon] || iconMap.consultation}
                    </svg>
                </div>
                <h3 class="service-card__title">${service.title}</h3>
                <p class="service-card__description">${service.description}</p>
                ${service.features ? `
                    <ul class="service-card__features">
                        ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                ` : ''}
            </article>
        `).join('');
        
        await DataLoader.populateFooter();
    } catch (error) {
        console.error('Error loading services:', error);
        servicesGrid.innerHTML = '<p>Error loading services. Please try again later.</p>';
    }
})();
