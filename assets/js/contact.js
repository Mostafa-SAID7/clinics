/**
 * Contact Page Script
 */

'use strict';

(async () => {
    const contactInfo = document.getElementById('contactInfo');
    
    if (!contactInfo) return;
    
    try {
        const siteInfo = await DataLoader.getSiteInfo();
        const contact = siteInfo.contact;
        const hours = siteInfo.hours;
        
        contactInfo.innerHTML = `
            <div class="contact-card">
                <div class="contact-card__icon">📧</div>
                <h3 class="contact-card__title">Email Us</h3>
                <p class="contact-card__info">${contact.email}</p>
            </div>
            <div class="contact-card">
                <div class="contact-card__icon">📞</div>
                <h3 class="contact-card__title">Call Us</h3>
                <p class="contact-card__info">${contact.phone}</p>
            </div>
            <div class="contact-card">
                <div class="contact-card__icon">📍</div>
                <h3 class="contact-card__title">Visit Us</h3>
                <p class="contact-card__info">${contact.address}</p>
            </div>
            <div class="contact-card">
                <div class="contact-card__icon">🕐</div>
                <h3 class="contact-card__title">Working Hours</h3>
                <p class="contact-card__info">
                    ${hours.weekdays}<br>
                    ${hours.saturday}<br>
                    ${hours.sunday}
                </p>
            </div>
        `;
        
        await DataLoader.populateFooter();
    } catch (error) {
        console.error('Error loading contact info:', error);
        contactInfo.innerHTML = '<p>Error loading contact information. Please try again later.</p>';
    }
})();
