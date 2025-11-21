/**
 * Home Page Script
 */

'use strict';

const loadHomeContent = async () => {
    const iconMap = {
        consultation: '<rect x="20" y="12" width="8" height="24" fill="currentColor"/><rect x="12" y="20" width="24" height="8" fill="currentColor"/>',
        diagnostic: '<circle cx="24" cy="24" r="12" stroke="currentColor" stroke-width="4" fill="none"/>',
        specialized: '<path d="M24 12L28 20H36L30 26L32 34L24 28L16 34L18 26L12 20H20L24 12Z" fill="currentColor"/>',
        telemedicine: '<rect x="16" y="12" width="16" height="24" rx="2" stroke="currentColor" stroke-width="4" fill="none"/>',
        emergency: '<path d="M24 8L28 20L40 20L30 28L34 40L24 32L14 40L18 28L8 20L20 20Z" fill="currentColor"/>',
        preventive: '<circle cx="24" cy="24" r="16" stroke="currentColor" stroke-width="4" fill="none"/><path d="M16 24L22 30L32 18" stroke="currentColor" stroke-width="4" fill="none"/>'
    };
    
    try {
        // Load site info
        const siteInfo = await DataLoader.getSiteInfo();
        
        // Update hero section with translations
        const heroTitle = document.getElementById('heroTitle');
        const heroSubtitle = document.getElementById('heroSubtitle');
        if (heroTitle) heroTitle.textContent = I18n.t('hero.title');
        if (heroSubtitle) heroSubtitle.textContent = I18n.t('hero.subtitle');
        
        // Load stats
        const statsGrid = document.getElementById('statsGrid');
        if (statsGrid) {
            const stats = await DataLoader.getStats();
            statsGrid.innerHTML = stats.map(stat => `
                <div class="stat-item">
                    <div class="stat-item__value">${stat.value}</div>
                    <div class="stat-item__label">${stat.label}</div>
                </div>
            `).join('');
        }
        
        // Load services (first 4)
        const servicesGrid = document.getElementById('servicesGrid');
        if (servicesGrid) {
            const services = await DataLoader.getServices();
            servicesGrid.innerHTML = services.slice(0, 4).map(service => `
                <article class="service-card">
                    <div class="service-card__icon" aria-hidden="true">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                            ${iconMap[service.icon] || iconMap.consultation}
                        </svg>
                    </div>
                    <h3 class="service-card__title">${service.title}</h3>
                    <p class="service-card__description">${service.description}</p>
                </article>
            `).join('');
        }
        
        // Load doctors (first 3)
        const doctorsGrid = document.getElementById('doctorsGrid');
        if (doctorsGrid) {
            const doctors = await DataLoader.getDoctors();
            const currentLang = I18n.getCurrentLanguage();
            const patientsText = currentLang === 'ar' ? 'مريض' : 'patients';
            
            doctorsGrid.innerHTML = doctors.slice(0, 3).map(doctor => `
                <article class="doctor-card">
                    <div class="doctor-card__image" role="img" aria-label="${doctor.name}"></div>
                    <div class="doctor-card__content">
                        <h3 class="doctor-card__name">${doctor.name}</h3>
                        <p class="doctor-card__specialty">${doctor.specialty}</p>
                        <p class="doctor-card__experience">${doctor.experience}</p>
                        <div class="doctor-card__meta">
                            <span class="doctor-card__rating">⭐ ${doctor.rating}</span>
                            <span class="doctor-card__patients">${doctor.patients}+ ${patientsText}</span>
                        </div>
                    </div>
                </article>
            `).join('');
        }
        
        // Populate footer
        await DataLoader.populateFooter();
        
        // Update all i18n elements
        I18n.updatePageContent();
        
        // Complete page loader
        if (typeof PageLoader !== 'undefined') {
            PageLoader.complete();
        }
        
    } catch (error) {
        console.error('Error loading home page data:', error);
        
        // Hide loader even on error
        if (typeof PageLoader !== 'undefined') {
            PageLoader.complete();
        }
    }
};

// Make reload function available globally
window.reloadPageContent = loadHomeContent;

// Initial load
loadHomeContent();
