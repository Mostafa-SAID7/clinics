/**
 * Doctors Page Script
 */

'use strict';

(async () => {
    const doctorsGrid = document.getElementById('doctorsGrid');
    
    if (!doctorsGrid) return;
    
    try {
        const doctors = await DataLoader.getDoctors();
        
        doctorsGrid.innerHTML = doctors.map(doctor => `
            <article class="doctor-card">
                <div class="doctor-card__image" role="img" aria-label="${doctor.name}"></div>
                <div class="doctor-card__content">
                    <h3 class="doctor-card__name">${doctor.name}</h3>
                    <p class="doctor-card__specialty">${doctor.specialty}</p>
                    <p class="doctor-card__experience">${doctor.experience}</p>
                    <p class="doctor-card__availability">Available: ${doctor.availability}</p>
                    <div class="doctor-card__meta">
                        <span class="doctor-card__rating">
                            ⭐ ${doctor.rating}
                        </span>
                        <span class="doctor-card__patients">${doctor.patients}+ patients</span>
                    </div>
                </div>
            </article>
        `).join('');
        
        await DataLoader.populateFooter();
    } catch (error) {
        console.error('Error loading doctors:', error);
        doctorsGrid.innerHTML = '<p>Error loading doctors. Please try again later.</p>';
    }
})();
