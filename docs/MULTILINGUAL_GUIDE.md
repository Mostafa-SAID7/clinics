# Multi-Language Implementation Guide

## Overview

ClinicHub features a complete bilingual system with **English (EN)** and **Arabic (AR)** support, including full RTL (Right-to-Left) layout for Arabic.

## Architecture

### Data Files Structure

```
data/
├── en/                   # English data files
│   ├── site.json        # Site information
│   ├── services.json    # Medical services
│   ├── doctors.json     # Doctor profiles
│   ├── departments.json # Medical departments
│   ├── testimonials.json # Patient testimonials
│   ├── stats.json       # Statistics
│   └── about.json       # About page content
│
├── ar/                   # Arabic data files
│   ├── site.json
│   ├── services.json
│   ├── doctors.json
│   ├── departments.json
│   ├── testimonials.json
│   ├── stats.json
│   └── about.json
│
└── README.md            # Data structure documentation
```

### How It Works

1. **Language Detection** - Checks localStorage for saved preference
2. **Data Loading** - Loads appropriate data file (data-en.json or data-ar.json)
3. **UI Translation** - Updates all UI elements with translations.json
4. **Layout Switch** - Applies RTL for Arabic, LTR for English
5. **Cache Management** - Caches data per language for performance

## Implementation Details

### 1. Data Files

Data is now organized into separate files by content type for better performance and maintainability.

#### English Data (data/en/)
```json
// site.json
{
  "name": "ClinicHub",
  "tagline": "Your Health, Our Priority",
  "description": "Experience world-class healthcare...",
  "contact": {...},
  "hours": {...}
}

// services.json
[
  {
    "id": 1,
    "title": "General Consultation",
    "description": "...",
    "features": [...]
  }
]

// doctors.json
[
  {
    "id": 1,
    "name": "Dr. Sarah Johnson",
    "specialty": "Cardiologist",
    ...
  }
]
```

#### Arabic Data (data/ar/)
```json
// site.json
{
  "name": "ClinicHub",
  "tagline": "صحتك أولويتنا",
  "description": "استمتع برعاية صحية عالمية المستوى...",
  "contact": {...},
  "hours": {...}
}

// services.json, doctors.json, etc. follow same structure
```

### 2. Language Switching Flow

```javascript
// User clicks language button
1. I18n.toggleLanguage()
   - Switches language (en ↔ ar)
   - Updates localStorage
   - Sets HTML lang and dir attributes

2. DataLoader.clearCache()
   - Clears cached data
   - Forces reload of new language data

3. I18n.updatePageContent()
   - Updates all [data-i18n] elements
   - Updates placeholders
   - Updates titles

4. window.reloadPageContent()
   - Reloads dynamic content
   - Fetches new language data
   - Re-renders components

5. Show success notification
```

### 3. HTML Attributes

#### Static Content (UI Elements)
```html
<!-- Text content -->
<h2 data-i18n="sections.services">Our Services</h2>

<!-- Placeholders -->
<input data-i18n-placeholder="form.email" placeholder="Email">

<!-- Titles -->
<button data-i18n-title="theme.light" title="Light Mode">
```

#### Dynamic Content (From JSON)
```javascript
// Loaded from data-en.json or data-ar.json
const services = await DataLoader.getServices();
services.forEach(service => {
    // service.title, service.description are already in correct language
});
```

### 4. RTL Support

#### Automatic RTL
```javascript
// When Arabic is selected
document.documentElement.setAttribute('dir', 'rtl');
```

#### SCSS RTL Styles
```scss
[dir="rtl"] {
  .element {
    margin-left: 0;
    margin-right: $spacing-md;
  }
}
```

## Content Structure

### Services (6 Services)
Each service includes:
- Title
- Description (detailed)
- Icon identifier
- Features list (5 items)
- Price information
- Duration

### Doctors (6 Doctors)
Each doctor includes:
- Name
- Specialty
- Experience
- Education
- Biography
- Rating (out of 5)
- Patient count
- Availability schedule
- Languages spoken
- Certifications

### Departments (6 Departments)
- Cardiology
- Pediatrics
- Dermatology
- Orthopedics
- Neurology
- General Medicine

### Statistics (4 Stats)
- Happy Patients: 15,000+
- Expert Doctors: 50+
- Years Experience: 25+
- Medical Services: 40+

### Testimonials (4 Reviews)
- Patient name
- Rating (1-5 stars)
- Comment
- Date
- Service used

### About Section
- Mission statement
- Vision statement
- Core values (5 values)
- Company history

## Usage Examples

### Loading Data in Current Language

```javascript
// Automatically loads correct language files
const siteInfo = await DataLoader.getSiteInfo();
const services = await DataLoader.getServices();
const doctors = await DataLoader.getDoctors();
const departments = await DataLoader.getDepartments();
const testimonials = await DataLoader.getTestimonials();
const stats = await DataLoader.getStats();
const about = await DataLoader.getAbout();
```

### Switching Languages

```javascript
// Toggle language
I18n.toggleLanguage();

// Clear data cache
DataLoader.clearCache();

// Reload content
await window.reloadPageContent();
```

### Getting Translations

```javascript
// Get UI translation
const title = I18n.t('sections.services');

// Get current language
const lang = I18n.getCurrentLanguage(); // 'en' or 'ar'
```

## Adding New Content

### 1. Add to English Data (data/en/services.json)

```json
[
  {
    "id": 7,
    "title": "New Service",
    "description": "Service description...",
    "icon": "service-icon",
    "features": ["Feature 1", "Feature 2"],
    "price": "Starting from $100",
    "duration": "30 minutes"
  }
]
```

### 2. Add to Arabic Data (data/ar/services.json)

```json
[
  {
    "id": 7,
    "title": "خدمة جديدة",
    "description": "وصف الخدمة...",
    "icon": "service-icon",
    "features": ["ميزة 1", "ميزة 2"],
    "price": "تبدأ من 100 دولار",
    "duration": "30 دقيقة"
  }
]
```

### 3. Add UI Translation (translations.json)

```json
{
  "en": {
    "newSection": {
      "title": "New Section"
    }
  },
  "ar": {
    "newSection": {
      "title": "قسم جديد"
    }
  }
}
```

## Testing

### Test Language Switching

1. Open website
2. Click language button (EN/AR)
3. Verify:
   - [ ] Layout switches (LTR ↔ RTL)
   - [ ] All text translates
   - [ ] Data reloads in new language
   - [ ] Navigation works
   - [ ] Forms work

### Test Data Loading

```javascript
// In browser console
console.log(await DataLoader.getServices());
console.log(await DataLoader.getDoctors());
```

### Test Cache

```javascript
// Check cached data
console.log(localStorage.getItem('clinichub_lang'));

// Clear cache
DataLoader.clearCache();
```

## Performance

### Caching Strategy
- Data cached per language
- Prevents redundant AJAX requests
- Fast language switching
- Efficient memory usage

### Loading Sequence
1. Check localStorage for language preference
2. Load appropriate data file (data-en.json or data-ar.json)
3. Cache data in memory
4. Render content
5. Apply translations

## Accessibility

### Language Attributes
```html
<html lang="en" dir="ltr">  <!-- English -->
<html lang="ar" dir="rtl">  <!-- Arabic -->
```

### Screen Readers
- Proper lang attributes
- RTL support
- ARIA labels in both languages

## Browser Support

Works in all modern browsers:
- Chrome ✓
- Firefox ✓
- Safari ✓
- Edge ✓
- Mobile browsers ✓

## Troubleshooting

### Issue: Content Not Translating

**Check:**
1. Both data files exist (data-en.json, data-ar.json)
2. translations.json is loaded
3. Console for errors
4. localStorage has correct language

**Solution:**
```javascript
// Clear and reset
localStorage.removeItem('clinichub_lang');
location.reload();
```

### Issue: RTL Layout Broken

**Check:**
1. HTML dir attribute is set
2. SCSS compiled correctly
3. RTL styles in _navigation.scss, _cards.scss

**Solution:**
```bash
npm run sass
```

### Issue: Mixed Languages

**Cause:** Cache not cleared when switching

**Solution:**
```javascript
DataLoader.clearCache();
await window.reloadPageContent();
```

## Best Practices

### 1. Consistent Structure
Keep same JSON structure in both language files:
```json
// Both files should have same keys
{ "id": 1, "title": "...", "description": "..." }
```

### 2. Complete Translations
Ensure all content is translated:
- Service descriptions
- Doctor bios
- Testimonials
- About section

### 3. Cultural Considerations
- Date formats
- Number formats
- Currency symbols
- Name order

### 4. Testing
Test both languages thoroughly:
- All pages
- All features
- All interactions
- Mobile responsive

## Summary

✅ **Implemented:**
- Separate data files per language
- Automatic language detection
- Smart caching per language
- Complete RTL support
- Seamless switching
- No page reload needed

✅ **Content:**
- 6 detailed services
- 6 doctor profiles
- 6 departments
- 4 testimonials
- 4 statistics
- Complete about section

✅ **Features:**
- Real-time language switching
- Data cache management
- RTL layout support
- Accessibility compliant
- Performance optimized

---

**Languages:** English (EN) | Arabic (AR)  
**Status:** ✅ Production Ready
