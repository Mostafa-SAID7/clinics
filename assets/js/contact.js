/**
 * Contact Page Script
 */

'use strict';

const loadContactContent = async () => {
    const contactInfo = document.getElementById('contactInfo');
    
    if (!contactInfo) return;
    
    try {
        const siteInfo = await DataLoader.getSiteInfo();
        const contact = siteInfo.contact;
        const hours = siteInfo.hours;
        const currentLang = I18n.getCurrentLanguage();
        
        const titles = {
            email: currentLang === 'ar' ? 'راسلنا' : 'Email Us',
            call: currentLang === 'ar' ? 'اتصل بنا' : 'Call Us',
            visit: currentLang === 'ar' ? 'زرنا' : 'Visit Us',
            hours: currentLang === 'ar' ? 'ساعات العمل' : 'Working Hours'
        };
        
        contactInfo.innerHTML = `
            <div class="contact-card">
                <div class="contact-card__icon">
                    <i class="fas fa-envelope"></i>
                </div>
                <h3 class="contact-card__title">${titles.email}</h3>
                <p class="contact-card__info">${contact.email}</p>
            </div>
            <div class="contact-card">
                <div class="contact-card__icon">
                    <i class="fas fa-phone"></i>
                </div>
                <h3 class="contact-card__title">${titles.call}</h3>
                <p class="contact-card__info">${contact.phone}</p>
            </div>
            <div class="contact-card">
                <div class="contact-card__icon">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
                <h3 class="contact-card__title">${titles.visit}</h3>
                <p class="contact-card__info">${contact.address}</p>
            </div>
            <div class="contact-card">
                <div class="contact-card__icon">
                    <i class="fas fa-clock"></i>
                </div>
                <h3 class="contact-card__title">${titles.hours}</h3>
                <p class="contact-card__info">
                    ${hours.weekdays}<br>
                    ${hours.saturday}<br>
                    ${hours.sunday}
                </p>
            </div>
        `;
        
        await DataLoader.populateFooter();
        I18n.updatePageContent();
    } catch (error) {
        console.error('Error loading contact info:', error);
        const errorMsg = I18n.getCurrentLanguage() === 'ar' 
            ? 'خطأ في تحميل معلومات الاتصال. يرجى المحاولة مرة أخرى.' 
            : 'Error loading contact information. Please try again later.';
        contactInfo.innerHTML = `<p>${errorMsg}</p>`;
    }
};

// Make reload function available globally
window.reloadPageContent = loadContactContent;

// Initial load
loadContactContent();
