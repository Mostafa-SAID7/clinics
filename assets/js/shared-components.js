/**
 * Shared Components
 * HTML for widgets used across all pages
 */

'use strict';

const SharedComponents = {
    /**
     * Get chat widget HTML
     */
    getChatWidget: () => `
        <div class="chat-widget">
            <button class="chat-toggle" aria-label="Open chat">
                <i class="fas fa-comments"></i>
            </button>
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
        // Check if chat widget already exists
        if (document.querySelector('.chat-widget')) return;
        
        const body = document.body;
        
        // Create container
        const container = document.createElement('div');
        container.innerHTML = SharedComponents.getChatWidget();
        
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
