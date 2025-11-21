/**
 * Smart Appointment Orchestration Engine
 * Handles dynamic appointment cart with priority-based rendering
 */

'use strict';

const AppointmentOrchestrator = (() => {
    let appointments = [];
    let filteredAppointments = [];
    let autoRefreshInterval = null;
    
    const appointmentsGrid = document.getElementById('appointmentsGrid');
    const waitingList = document.getElementById('waitingList');
    const filterPriority = document.getElementById('filterPriority');
    const filterType = document.getElementById('filterType');
    const filterStatus = document.getElementById('filterStatus');
    const refreshBtn = document.getElementById('refreshBtn');
    
    /**
     * Initialize the orchestrator
     */
    const init = async () => {
        await loadAppointments();
        setupEventListeners();
        startAutoRefresh();
    };
    
    /**
     * Load appointments from data source
     */
    const loadAppointments = async () => {
        try {
            const data = await fetch('../data/data.json').then(res => res.json());
            appointments = data.appointments || [];
            applyFilters();
            renderAppointments();
            renderWaitingList();
        } catch (error) {
            console.error('Error loading appointments:', error);
            showToast('Error loading appointments', 'error');
        }
    };
    
    /**
     * Setup event listeners
     */
    const setupEventListeners = () => {
        filterPriority?.addEventListener('change', applyFilters);
        filterType?.addEventListener('change', applyFilters);
        filterStatus?.addEventListener('change', applyFilters);
        refreshBtn?.addEventListener('click', handleRefresh);
    };
    
    /**
     * Apply filters to appointments
     */
    const applyFilters = () => {
        const priorityFilter = filterPriority?.value || 'all';
        const typeFilter = filterType?.value || 'all';
        const statusFilter = filterStatus?.value || 'all';
        
        filteredAppointments = appointments.filter(apt => {
            const matchPriority = priorityFilter === 'all' || apt.priority === priorityFilter;
            const matchType = typeFilter === 'all' || apt.patientType === typeFilter;
            const matchStatus = statusFilter === 'all' || apt.status === statusFilter;
            
            return matchPriority && matchType && matchStatus;
        });
        
        // Sort by priority: urgent > normal, then by time
        filteredAppointments.sort((a, b) => {
            if (a.priority === 'urgent' && b.priority !== 'urgent') return -1;
            if (a.priority !== 'urgent' && b.priority === 'urgent') return 1;
            if (a.patientType === 'first-time' && b.patientType !== 'first-time') return -1;
            if (a.patientType !== 'first-time' && b.patientType === 'first-time') return 1;
            return a.time.localeCompare(b.time);
        });
        
        renderAppointments();
    };
    
    /**
     * Render appointments grid
     */
    const renderAppointments = () => {
        if (!appointmentsGrid) return;
        
        const confirmedAppointments = filteredAppointments.filter(apt => apt.status === 'confirmed');
        
        if (confirmedAppointments.length === 0) {
            appointmentsGrid.innerHTML = '<p class="empty-state">No appointments found</p>';
            return;
        }
        
        appointmentsGrid.innerHTML = confirmedAppointments.map(apt => createAppointmentCard(apt)).join('');
    };
    
    /**
     * Create appointment card HTML
     */
    const createAppointmentCard = (apt) => {
        const doctorInitials = apt.doctorName.split(' ').map(n => n[0]).join('');
        const utilization = calculateUtilization(apt.doctorId);
        
        return `
            <article class="appointment-card priority-${apt.priority}" data-id="${apt.id}">
                <div class="appointment-card__header">
                    <span class="appointment-card__id">${apt.id}</span>
                    <span class="appointment-card__badge badge-${apt.patientType}">
                        ${apt.patientType.replace('-', ' ')}
                    </span>
                </div>
                
                <h3 class="appointment-card__patient">${apt.patientName}</h3>
                
                <div class="appointment-card__doctor">
                    <div class="doctor-avatar">${doctorInitials}</div>
                    <div>
                        <div style="font-weight: 600; color: var(--color-gray-900);">${apt.doctorName}</div>
                        <div style="font-size: var(--font-size-sm);">${apt.specialty}</div>
                    </div>
                </div>
                
                <div class="appointment-card__details">
                    <div class="detail-item">
                        <span class="detail-label">Date</span>
                        <span class="detail-value">${formatDate(apt.date)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Time</span>
                        <span class="detail-value">${apt.time}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Duration</span>
                        <span class="detail-value">${apt.duration} min</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Priority</span>
                        <span class="detail-value" style="color: ${apt.priority === 'urgent' ? '#dc2626' : '#16a34a'};">
                            ${apt.priority.toUpperCase()}
                        </span>
                    </div>
                </div>
                
                <p class="appointment-card__reason">"${apt.reason}"</p>
                
                <div class="appointment-card__status status-${apt.status}">
                    <span class="status-indicator"></span>
                    <span>${apt.status.replace('-', ' ').toUpperCase()}</span>
                </div>
                
                <div class="utilization-indicator">
                    <div class="utilization-label">
                        <span>Doctor Schedule Utilization</span>
                        <span>${utilization}%</span>
                    </div>
                    <div class="utilization-bar">
                        <div class="utilization-fill" style="width: ${utilization}%"></div>
                    </div>
                </div>
            </article>
        `;
    };
    
    /**
     * Render waiting list
     */
    const renderWaitingList = () => {
        if (!waitingList) return;
        
        const waitingAppointments = appointments.filter(apt => apt.status === 'waiting-list');
        
        if (waitingAppointments.length === 0) {
            waitingList.innerHTML = '<p class="empty-state">No patients on waiting list</p>';
            return;
        }
        
        waitingList.innerHTML = waitingAppointments.map(apt => `
            <div class="waiting-list-item" data-id="${apt.id}">
                <div class="waiting-list-item__info">
                    <div class="waiting-list-item__name">${apt.patientName}</div>
                    <div class="waiting-list-item__details">
                        ${apt.doctorName} • ${apt.specialty} • Requested: ${formatDate(apt.date)} ${apt.time}
                    </div>
                </div>
                <div class="waiting-list-item__action">
                    <button class="btn btn--primary btn--small" onclick="AppointmentOrchestrator.offerSlot('${apt.id}')">
                        Offer Slot
                    </button>
                </div>
            </div>
        `).join('');
    };
    
    /**
     * Calculate doctor utilization (simulated)
     */
    const calculateUtilization = (doctorId) => {
        const doctorAppointments = appointments.filter(apt => apt.doctorId === doctorId);
        const baseUtilization = 75;
        const variance = doctorAppointments.length * 3;
        return Math.min(95, baseUtilization + variance);
    };
    
    /**
     * Format date for display
     */
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };
    
    /**
     * Handle refresh button click
     */
    const handleRefresh = async () => {
        refreshBtn.disabled = true;
        refreshBtn.querySelector('.refresh-icon').style.transform = 'rotate(360deg)';
        
        await loadAppointments();
        showToast('Appointments refreshed', 'success');
        
        setTimeout(() => {
            refreshBtn.disabled = false;
            refreshBtn.querySelector('.refresh-icon').style.transform = 'rotate(0deg)';
        }, 1000);
    };
    
    /**
     * Start auto-refresh (simulates real-time updates)
     */
    const startAutoRefresh = () => {
        // Refresh every 30 seconds
        autoRefreshInterval = setInterval(() => {
            simulateCancellationSlot();
        }, 30000);
    };
    
    /**
     * Simulate a cancellation slot appearing
     */
    const simulateCancellationSlot = () => {
        // Randomly move a waiting list item to confirmed (10% chance)
        const waitingAppointments = appointments.filter(apt => apt.status === 'waiting-list');
        
        if (waitingAppointments.length > 0 && Math.random() < 0.1) {
            const randomIndex = Math.floor(Math.random() * waitingAppointments.length);
            waitingAppointments[randomIndex].status = 'confirmed';
            
            applyFilters();
            renderWaitingList();
            
            showToast(`Slot available for ${waitingAppointments[randomIndex].patientName}!`, 'success');
        }
    };
    
    /**
     * Offer slot to waiting list patient
     */
    const offerSlot = (appointmentId) => {
        const apt = appointments.find(a => a.id === appointmentId);
        if (apt) {
            apt.status = 'confirmed';
            applyFilters();
            renderWaitingList();
            showToast(`Slot offered to ${apt.patientName}`, 'success');
        }
    };
    
    /**
     * Show toast notification
     */
    const showToast = (message, type = 'info') => {
        const toast = document.getElementById('toast');
        if (!toast) return;
        
        toast.textContent = message;
        toast.className = `toast ${type} show`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    };
    
    return {
        init,
        offerSlot
    };
})();

// Initialize when DOM is ready
(async () => {
    await AppointmentOrchestrator.init();
    await DataLoader.populateFooter();
})();
