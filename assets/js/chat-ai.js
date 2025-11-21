/**
 * AI Chat Assistant Module
 * Simulated AI responses with localStorage history
 */

'use strict';

const ChatAI = (() => {
    let chatHistory = JSON.parse(localStorage.getItem('clinichub_chat_history')) || [];
    const MAX_HISTORY = 50;
    
    /**
     * Knowledge base for AI responses
     */
    const knowledgeBase = {
        services: {
            keywords: ['service', 'services', 'خدمة', 'خدمات', 'what do you offer', 'ماذا تقدمون'],
            response: {
                en: "We offer comprehensive healthcare services including General Consultation, Diagnostic Services, Specialized Care, Telemedicine, Emergency Care, and Preventive Care. Would you like to know more about any specific service?",
                ar: "نقدم خدمات رعاية صحية شاملة تشمل الاستشارات العامة، الخدمات التشخيصية، الرعاية المتخصصة، الطب عن بعد، الرعاية الطارئة، والرعاية الوقائية. هل تريد معرفة المزيد عن أي خدمة محددة؟"
            }
        },
        appointment: {
            keywords: ['appointment', 'book', 'schedule', 'موعد', 'حجز', 'احجز'],
            response: {
                en: "You can book an appointment easily through our website. Click on 'Book Appointment' button or visit our Appointment page. You'll need to provide your name, contact details, preferred date, and select a department.",
                ar: "يمكنك حجز موعد بسهولة من خلال موقعنا. انقر على زر 'احجز موعد' أو قم بزيارة صفحة المواعيد. ستحتاج إلى تقديم اسمك وتفاصيل الاتصال والتاريخ المفضل واختيار القسم."
            }
        },
        doctors: {
            keywords: ['doctor', 'doctors', 'specialist', 'طبيب', 'أطباء', 'متخصص'],
            response: {
                en: "We have a team of highly qualified doctors including cardiologists, pediatricians, dermatologists, and orthopedic surgeons. All our doctors have 10+ years of experience. Visit our Doctors page to see their profiles and availability.",
                ar: "لدينا فريق من الأطباء المؤهلين تأهيلاً عالياً بما في ذلك أطباء القلب وأطباء الأطفال وأطباء الجلدية وجراحي العظام. جميع أطبائنا لديهم خبرة تزيد عن 10 سنوات. قم بزيارة صفحة الأطباء لرؤية ملفاتهم الشخصية ومدى توفرهم."
            }
        },
        hours: {
            keywords: ['hours', 'time', 'open', 'close', 'ساعات', 'وقت', 'مفتوح', 'مغلق'],
            response: {
                en: "We're open Monday to Friday from 8:00 AM to 8:00 PM, Saturday from 9:00 AM to 5:00 PM. Emergency services are available 24/7.",
                ar: "نحن مفتوحون من الاثنين إلى الجمعة من الساعة 8:00 صباحاً حتى 8:00 مساءً، والسبت من 9:00 صباحاً حتى 5:00 مساءً. خدمات الطوارئ متاحة على مدار الساعة طوال أيام الأسبوع."
            }
        },
        contact: {
            keywords: ['contact', 'phone', 'email', 'address', 'اتصال', 'هاتف', 'بريد', 'عنوان'],
            response: {
                en: "You can reach us at:\nPhone: +1 (555) 123-4567\nEmail: info@clinichub.com\nAddress: 123 Medical Center Dr, Suite 100, New York, NY 10001",
                ar: "يمكنك التواصل معنا على:\nالهاتف: +1 (555) 123-4567\nالبريد الإلكتروني: info@clinichub.com\nالعنوان: 123 Medical Center Dr, Suite 100, New York, NY 10001"
            }
        },
        telemedicine: {
            keywords: ['telemedicine', 'online', 'virtual', 'video', 'الطب عن بعد', 'أونلاين', 'افتراضي'],
            response: {
                en: "Yes! We offer telemedicine services with secure video consultations. You can consult with our doctors from the comfort of your home. Book a telemedicine appointment through our website.",
                ar: "نعم! نقدم خدمات الطب عن بعد مع استشارات فيديو آمنة. يمكنك استشارة أطبائنا من راحة منزلك. احجز موعد طب عن بعد من خلال موقعنا."
            }
        },
        emergency: {
            keywords: ['emergency', 'urgent', 'طوارئ', 'عاجل'],
            response: {
                en: "For medical emergencies, please call 911 immediately or visit our emergency department. We have 24/7 emergency services with rapid response teams.",
                ar: "في حالات الطوارئ الطبية، يرجى الاتصال بالرقم 911 على الفور أو زيارة قسم الطوارئ لدينا. لدينا خدمات طوارئ على مدار الساعة مع فرق استجابة سريعة."
            }
        }
    };
    
    /**
     * Get AI response based on user message
     * @param {string} message - User message
     * @param {string} lang - Current language
     * @returns {string} AI response
     */
    const getResponse = (message, lang = 'en') => {
        const lowerMessage = message.toLowerCase();
        
        // Check knowledge base
        for (const [key, data] of Object.entries(knowledgeBase)) {
            if (data.keywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()))) {
                return data.response[lang];
            }
        }
        
        // Default response
        return lang === 'ar' 
            ? 'شكراً لسؤالك! يمكنني مساعدتك في معلومات حول خدماتنا، الأطباء، المواعيد، ساعات العمل، أو معلومات الاتصال. كيف يمكنني مساعدتك؟'
            : "Thank you for your question! I can help you with information about our services, doctors, appointments, hours, or contact details. How can I assist you?";
    };
    
    /**
     * Add message to chat history
     * @param {string} message - Message text
     * @param {string} sender - 'user' or 'bot'
     */
    const addToHistory = (message, sender) => {
        const entry = {
            message,
            sender,
            timestamp: new Date().toISOString()
        };
        
        chatHistory.push(entry);
        
        // Keep only last MAX_HISTORY messages
        if (chatHistory.length > MAX_HISTORY) {
            chatHistory = chatHistory.slice(-MAX_HISTORY);
        }
        
        localStorage.setItem('clinichub_chat_history', JSON.stringify(chatHistory));
    };
    
    /**
     * Get chat history
     * @returns {Array} Chat history
     */
    const getHistory = () => chatHistory;
    
    /**
     * Clear chat history
     */
    const clearHistory = () => {
        chatHistory = [];
        localStorage.removeItem('clinichub_chat_history');
    };
    
    /**
     * Render chat message
     * @param {string} message - Message text
     * @param {string} sender - 'user' or 'bot'
     * @returns {HTMLElement} Message element
     */
    const renderMessage = (message, sender) => {
        const messageEl = document.createElement('div');
        messageEl.className = `chat-message ${sender}`;
        messageEl.textContent = message;
        return messageEl;
    };
    
    /**
     * Show typing indicator
     * @param {HTMLElement} container - Messages container
     * @returns {HTMLElement} Typing indicator element
     */
    const showTypingIndicator = (container) => {
        const typingEl = document.createElement('div');
        typingEl.className = 'chat-message bot typing-indicator';
        typingEl.innerHTML = '<span></span><span></span><span></span>';
        container.appendChild(typingEl);
        container.scrollTop = container.scrollHeight;
        return typingEl;
    };
    
    /**
     * Initialize chat widget
     */
    const init = () => {
        const chatToggle = document.querySelector('.chat-toggle');
        const chatWindow = document.querySelector('.chat-window');
        const chatClose = document.querySelector('.chat-close');
        const chatMessages = document.querySelector('.chat-messages');
        const chatInput = document.querySelector('.chat-input');
        const chatSend = document.querySelector('.chat-send');
        
        if (!chatToggle || !chatWindow) return;
        
        // Toggle chat window
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
            
            // Load greeting if first time
            if (chatMessages.children.length === 0) {
                const lang = I18n.getCurrentLanguage();
                const greeting = I18n.t('chat.greeting');
                chatMessages.appendChild(renderMessage(greeting, 'bot'));
            }
        });
        
        // Close chat window
        if (chatClose) {
            chatClose.addEventListener('click', () => {
                chatWindow.classList.remove('active');
            });
        }
        
        // Send message
        const sendMessage = () => {
            const message = chatInput.value.trim();
            if (!message) return;
            
            const lang = I18n.getCurrentLanguage();
            
            // Add user message
            chatMessages.appendChild(renderMessage(message, 'user'));
            addToHistory(message, 'user');
            chatInput.value = '';
            
            // Show typing indicator
            const typingEl = showTypingIndicator(chatMessages);
            
            // Simulate AI thinking time
            setTimeout(() => {
                typingEl.remove();
                
                // Get and display AI response
                const response = getResponse(message, lang);
                chatMessages.appendChild(renderMessage(response, 'bot'));
                addToHistory(response, 'bot');
                
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000 + Math.random() * 1000);
        };
        
        // Send button click
        if (chatSend) {
            chatSend.addEventListener('click', sendMessage);
        }
        
        // Enter key to send
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    };
    
    return {
        init,
        getResponse,
        getHistory,
        clearHistory
    };
})();
