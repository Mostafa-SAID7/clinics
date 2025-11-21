/**
 * Shared Components
 * HTML for widgets used across all pages
 */

'use strict';

const SharedComponents = {
    /**
     * Get theme and language controls HTML
     */
    getControls: () => `
        <div class="theme-controls">
            <button class="theme-btn" aria-label="Toggle theme">🌙</button>
            <button class="lang-btn" aria-label="Toggle language">EN</button>
        </div>
    `,
    
    /**
     * Get chat widget HTML
     */
    getChatWidget: () => `
        <div class="chat-widget">
            <button class="chat-toggle" aria-label="Open chat">💬</button>
            <div class="chat-window">
                <div class="chat-header">
                    <h3 data-i18n="chat.title">AI Assistant</h3>
                    <button class="chat-close" aria-label="Close chat">×</button>
                </div>
                <div class="chat-messages"></div>
                <div class="chat-input-container">
                    <input type="text" class="chat-input" data-i18n="chat.placeholder" placeholder="Ask me anything...">
                    <button class="chat-send" data-i18n="chat.send">Send</button>
                </div>
            </div>
        </div>
    `,
    
    /**
     * Inject components into page
     */
    inject: () => {
        // Check if components already exist
        if (document.querySelector('.theme-controls')) return;
        
        const body = document.body;
        
        // Create container
        const container = document.createElement('div');
        container.innerHTML = SharedComponents.getControls() + SharedComponents.getChatWidget();
        
        // Append to body
        while (container.firstChild) {
            body.appendChild(container.firstChild);
        }
    }
};

// Auto-inject on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', SharedComponents.inject);
} else {
    SharedComponents.inject();
}
