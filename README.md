# ClinicHub - Modern Healthcare Website

A production-ready, data-driven healthcare website built with HTML5, modern CSS (Microsoft Fluent Design), and vanilla JavaScript ES6+.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm start
```

Then open your browser to: **http://localhost:8080**

That's it! The website will load with all features working.

## 🎨 Design Features

- **Microsoft Fluent Design System** - Acrylic effects, modern shadows, and smooth animations
- **Fully Responsive** - Mobile-first design with breakpoints for tablet and desktop
- **Accessibility Compliant** - WCAG 2.1 AA standards with ARIA labels and keyboard navigation
- **Data-Driven Architecture** - All content loaded from centralized JSON file

## 📁 Project Structure

```
ClinicHub/
├── index.html              # Home page
├── package.json            # NPM configuration
├── data/
│   ├── data.json          # Centralized data source
│   └── translations.json  # Multi-language translations
├── pages/
│   ├── services.html      # Services page
│   ├── doctors.html       # Doctors page
│   ├── appointment.html   # Appointment booking page
│   ├── contact.html       # Contact page
│   └── about.html         # About page
├── assets/
│   ├── scss/              # SASS source files
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   ├── _base.scss
│   │   ├── _utilities.scss
│   │   ├── components/
│   │   └── main.scss
│   ├── css/
│   │   └── main.css       # Compiled CSS (generated)
│   └── js/
│       ├── main.js               # Core functionality (navigation, validation)
│       ├── i18n.js               # Internationalization module
│       ├── theme.js              # Theme switching module
│       ├── chat-ai.js            # AI chat assistant
│       ├── data-loader.js        # Data loading module
│       ├── shared-components.js  # Shared UI components
│       ├── home.js               # Home page script
│       ├── services.js           # Services page script
│       ├── doctors.js            # Doctors page script
│       ├── appointment.js        # Appointment page script (with auto-save)
│       ├── contact.js            # Contact page script
│       └── about.js              # About page script
└── README.md
```

## 🚀 Features

### Design System
- Microsoft Fluent Design color palette
- Acrylic material effects with backdrop blur
- Fluent shadows and depth system
- Smooth animations and transitions
- Modern gradient backgrounds
- **Dark/Light Theme** - Toggle with localStorage persistence

### Functionality
- **Responsive Navigation** - Mobile hamburger menu with smooth transitions
- **Form Validation** - Real-time validation with accessibility support
- **Toast Notifications** - User feedback system
- **Smooth Scrolling** - Enhanced navigation experience
- **Scroll Animations** - Intersection Observer for performance
- **Data-Driven Content** - All content loaded from JSON
- **AI Chat Assistant** - Intelligent chatbot with knowledge base
- **Multi-Language Support** - English and Arabic with RTL support
- **LocalStorage Integration** - Saves theme, language, form drafts, and chat history
- **Auto-Save Forms** - Real-time form data persistence

### Pages
1. **Home** - Hero section, stats, featured services, and doctors
2. **Services** - Complete service catalog with features
3. **Doctors** - Doctor profiles with ratings and availability
4. **Appointment** - Booking form with validation
5. **Contact** - Contact information and hours
6. **About** - Company statistics and information

## 🎯 Data Management

All content is managed through JSON files:

**data/data.json:**
- Site information (name, tagline, contact)
- Services with features
- Doctor profiles
- Departments
- Statistics
- Testimonials
- Operating hours

**data/translations.json:**
- English translations
- Arabic translations (with RTL support)
- All UI text and messages

## 🤖 AI Chat Assistant

The AI chat assistant provides instant answers about:
- Services and specialties
- Doctor information and availability
- Appointment booking process
- Contact information and hours
- Telemedicine services
- Emergency procedures

Chat history is automatically saved to localStorage.

## 🌍 Multi-Language Support

- **English (EN)** - Default language
- **Arabic (AR)** - Full RTL support
- Language preference saved to localStorage
- Instant language switching without page reload
- All content dynamically translated

## 💾 LocalStorage Features

The application uses localStorage to persist:
1. **Theme Preference** - Light/Dark mode
2. **Language Selection** - EN/AR
3. **Form Drafts** - Auto-saves appointment form data (expires after 7 days)
4. **Chat History** - Last 50 chat messages

## 🎨 Theme System

- **Light Mode** - Clean, bright interface
- **Dark Mode** - Eye-friendly dark theme with adjusted colors
- Smooth transitions between themes
- Respects system preferences on first visit
- Persistent across sessions

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Breakpoints

- Mobile: < 480px
- Tablet: 481px - 768px
- Desktop: > 768px

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus visible indicators
- Reduced motion support
- Screen reader friendly

## 🎨 Color Palette (Microsoft Fluent)

- Primary: #0078d4
- Secondary: #00b7c3
- Accent: #8764b8
- Neutral grays: #f9fafb to #111827

## 🛠️ Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Compile SASS (one-time)
npm run sass

# Watch SASS files for changes
npm run sass:watch

# Development mode with source maps
npm run sass:dev
```

### SASS Architecture

The project uses a professional SASS architecture with:
- **Variables** - Design tokens and configuration
- **Mixins** - Reusable patterns and utilities
- **Components** - Modular component styles
- **Utilities** - Helper classes
- **Responsive** - Mobile-first breakpoints

See `assets/scss/README.md` for detailed documentation.

## 📝 License

© 2025 ClinicHub. All rights reserved.
