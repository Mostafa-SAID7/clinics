/**
 * Appointment Page Script
 */

'use strict';

(async () => {
    const departmentSelect = document.getElementById('department');
    
    if (departmentSelect) {
        try {
            const departments = await DataLoader.getDepartments();
            
            departments.forEach(dept => {
                const option = document.createElement('option');
                option.value = dept.id;
                option.textContent = dept.name;
                departmentSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading departments:', error);
        }
    }
    
    await DataLoader.populateFooter();
})();
