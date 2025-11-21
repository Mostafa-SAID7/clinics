/**
 * Doctors Page Script
 */

'use strict';

const loadDoctorsContent = async () => {
    const doctorsGrid = document.getElementById('doctorsGrid');
    
    if (!doctorsGrid) return;
    
    try {
        const doctors = await DataLoader.getDoctors();
        const currentLang = I18n.getCurrentLanguage();
        const availableText = currentLang === 'ar' ? 'متاح:' : 'Available:';
        const patientsText = currentLang === 'ar' ? 'مريض' : 'patients';
        
        doctorsGrid.innerHTML = doctors.map(doctor => `
            <article class="doctor-card">
                <div class="doctor-card__image" role="img" aria-label="${doctor.name}"></div>
                <div class="doctor-card__content">
                    <h3 class="doctor-card__name">${doctor.name}</h3>
                    <p class="doctor-card__specialty">${doctor.specialty}</p>
                    <p class="doctor-card__experience">${doctor.experience}</p>
                    <p class="doctor-card__availability">${availableText} ${doctor.availability}</p>
                    <div class="doctor-card__meta">
                        <span class="doctor-card__rating">
                            ⭐ ${doctor.rating}
                        </span>
                        <span class="doctor-card__patients">${doctor.patients}+ ${patientsText}</span>
                    </div>
                </div>
            </article>
        `).join('');
        
        await DataLoader.populateFooter();
        I18n.updatePageContent();
    } catch (error) {
        console.error('Error loading doctors:', error);
        const errorMsg = I18n.getCurrentLanguage() === 'ar' 
            ? 'خطأ في تحميل الأطباء. يرجى المحاولة مرة أخرى.' 
            : 'Error loading doctors. Please try again later.';
        doctorsGrid.innerHTML = `<p>${errorMsg}</p>`;
    }
};

// Make reload function available globally
window.reloadPageContent = loadDoctorsContent;

// Initial load
loadDoctorsContent();
