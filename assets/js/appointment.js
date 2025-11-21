/**
 * Appointment Page Script with localStorage
 */

'use strict';

const FORM_STORAGE_KEY = 'clinichub_appointment_draft';

/**
 * Save form data to localStorage
 */
const saveFormData = () => {
    const form = document.getElementById('appointmentForm');
    if (!form) return;
    
    const formData = {
        fullName: form.fullName.value,
        email: form.email.value,
        phone: form.phone.value,
        date: form.date.value,
        department: form.department.value,
        message: form.message.value,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
};

/**
 * Load form data from localStorage
 */
const loadFormData = () => {
    const form = document.getElementById('appointmentForm');
    if (!form) return;
    
    const savedData = localStorage.getItem(FORM_STORAGE_KEY);
    if (!savedData) return;
    
    try {
        const formData = JSON.parse(savedData);
        
        // Check if data is not too old (7 days)
        const savedDate = new Date(formData.timestamp);
        const now = new Date();
        const daysDiff = (now - savedDate) / (1000 * 60 * 60 * 24);
        
        if (daysDiff > 7) {
            localStorage.removeItem(FORM_STORAGE_KEY);
            return;
        }
        
        // Restore form values
        if (formData.fullName) form.fullName.value = formData.fullName;
        if (formData.email) form.email.value = formData.email;
        if (formData.phone) form.phone.value = formData.phone;
        if (formData.date) form.date.value = formData.date;
        if (formData.department) form.department.value = formData.department;
        if (formData.message) form.message.value = formData.message;
    } catch (error) {
        console.error('Error loading form data:', error);
    }
};

/**
 * Clear form data from localStorage
 */
const clearFormData = () => {
    localStorage.removeItem(FORM_STORAGE_KEY);
};

(async () => {
    const departmentSelect = document.getElementById('department');
    const form = document.getElementById('appointmentForm');
    
    if (departmentSelect) {
        try {
            const departments = await DataLoader.getDepartments();
            
            // Keep the first option (Select Department)
            const firstOption = departmentSelect.querySelector('option[value=""]');
            
            departments.forEach(dept => {
                const option = document.createElement('option');
                option.value = dept.id;
                option.textContent = dept.name;
                departmentSelect.appendChild(option);
            });
            
            // Load saved form data after departments are loaded
            loadFormData();
        } catch (error) {
            console.error('Error loading departments:', error);
        }
    }
    
    // Auto-save form data on input
    if (form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', debounce(saveFormData, 500));
            input.addEventListener('change', saveFormData);
        });
        
        // Clear saved data on successful submission
        form.addEventListener('submit', (e) => {
            // Wait a bit before clearing to ensure submission is processed
            setTimeout(() => {
                if (!form.querySelector('.form-input.error')) {
                    clearFormData();
                }
            }, 2000);
        });
    }
    
    await DataLoader.populateFooter();
})();
