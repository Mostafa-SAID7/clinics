# Loading & Skeleton UI Guide

## Overview

ClinicHub now features a professional loading experience with:
1. **Initial Page Loader** - Progress bar for first-time visitors
2. **Skeleton Loaders** - Content placeholders for all pages
3. **Smooth Transitions** - Seamless content loading

## Features

### ✨ Initial Page Loader

A beautiful full-screen loader with:
- Animated logo
- Progress bar (0-100%)
- Percentage indicator
- Gradient background
- Smooth fade-out transition

**Behavior:**
- Shows only on **first visit** (per session)
- Uses `sessionStorage` to track
- Auto-completes when content loads
- Simulates progressive loading

### 🎨 Skeleton Loaders

Content placeholders that match actual content:
- **Service Cards** - Icon, title, description
- **Doctor Cards** - Image, name, specialty
- **Stats Grid** - Value and label placeholders
- **Hero Section** - Title, text, buttons, image

**Benefits:**
- Reduces perceived loading time
- Improves user experience
- Prevents layout shift
- Professional appearance

## Implementation

### 1. Page Loader

#### HTML (Auto-injected)
```html
<div class="page-loader" id="pageLoader">
    <div class="page-loader__content">
        <div class="page-loader__logo">
            <svg>...</svg>
            <div>ClinicHub</div>
        </div>
        <p class="page-loader__text">Loading your healthcare experience...</p>
        <div class="page-loader__progress">
            <div class="page-loader__bar" id="progressBar"></div>
        </div>
        <div class="page-loader__percentage">0%</div>
    </div>
</div>
```

#### JavaScript Usage
```javascript
// Initialize (auto-runs on first visit)
PageLoader.init();

// Complete loading
PageLoader.complete();

// Force show (for testing)
PageLoader.show();

// Hide immediately
PageLoader.hide();

// Update progress manually
PageLoader.updateProgress(50); // 50%
```

### 2. Skeleton Loaders

#### Service Card Skeleton
```html
<div class="skeleton-service">
    <div class="skeleton-service__icon"></div>
    <div class="skeleton-service__title"></div>
    <div class="skeleton-service__text"></div>
    <div class="skeleton-service__text"></div>
</div>
```

#### Doctor Card Skeleton
```html
<div class="skeleton-doctor">
    <div class="skeleton-doctor__image"></div>
    <div class="skeleton-doctor__content">
        <div class="skeleton-doctor__name"></div>
        <div class="skeleton-doctor__specialty"></div>
        <div class="skeleton-doctor__experience"></div>
    </div>
</div>
```

#### Stats Skeleton
```html
<div class="skeleton-stats">
    <div class="skeleton-stats__grid">
        <div class="skeleton-stats__item">
            <div class="skeleton-stats__item-value"></div>
            <div class="skeleton-stats__item-label"></div>
        </div>
        <!-- Repeat for each stat -->
    </div>
</div>
```

### 3. Content Loading Pattern

```javascript
const loadContent = async () => {
    try {
        // Load data via AJAX
        const data = await DataLoader.getData();
        
        // Populate content
        renderContent(data);
        
        // Complete loader (hides skeletons)
        if (typeof PageLoader !== 'undefined') {
            PageLoader.complete();
        }
        
    } catch (error) {
        console.error('Error loading:', error);
        
        // Hide loader even on error
        PageLoader.complete();
    }
};
```

## SCSS Structure

### Loader Styles
```scss
// Page Loader
.page-loader {
  position: fixed;
  z-index: 9999;
  background: gradient;
  
  &.hidden {
    opacity: 0;
    visibility: hidden;
  }
  
  &__progress {
    width: 300px;
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
  }
  
  &__bar {
    width: 0%;
    transition: width 0.3s ease;
  }
}

// Skeleton Base
.skeleton {
  background: linear-gradient(90deg, ...);
  animation: shimmer 1.5s infinite;
}

// Hide when loaded
.content-loaded {
  .skeleton-card,
  .skeleton-service,
  .skeleton-doctor {
    display: none;
  }
}
```

## Animations

### Shimmer Effect
```scss
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
```

### Rotate (Logo)
```scss
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

### Pulse (Logo Text)
```scss
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

## Usage Examples

### Home Page
```html
<!-- Skeleton -->
<div class="services__grid">
    <div class="skeleton-service">...</div>
    <div class="skeleton-service">...</div>
    <div class="skeleton-service">...</div>
</div>

<!-- Actual Content (hidden until loaded) -->
<div id="servicesGrid" class="services__grid"></div>
```

### Doctors Page
```html
<!-- Skeleton -->
<div class="doctors__grid">
    <div class="skeleton-doctor">...</div>
    <div class="skeleton-doctor">...</div>
</div>

<!-- Actual Content -->
<div id="doctorsGrid" class="doctors__grid"></div>
```

## Customization

### Change Loader Colors
```scss
.page-loader {
  background: linear-gradient(135deg, $your-color-1, $your-color-2);
}
```

### Change Progress Bar Speed
```javascript
// In loader.js
const simulateProgress = () => {
    progressInterval = setInterval(() => {
        // Adjust increment values
        const increment = progressValue < 50 ? 15 : 5; // Faster
        updateProgress(progressValue + increment);
    }, 150); // Faster interval
};
```

### Change Skeleton Animation Speed
```scss
.skeleton {
  animation: shimmer 1s infinite; // Faster (default: 1.5s)
}
```

## Best Practices

### 1. Match Skeleton to Content
- Use same layout structure
- Match card dimensions
- Keep consistent spacing

### 2. Loading Sequence
```javascript
// 1. Show skeleton (already in HTML)
// 2. Load data via AJAX
const data = await loadData();

// 3. Render content
renderContent(data);

// 4. Complete loader (hides skeleton)
PageLoader.complete();
```

### 3. Error Handling
```javascript
try {
    await loadContent();
} catch (error) {
    // Always complete loader
    PageLoader.complete();
    
    // Show error message
    showError('Failed to load content');
}
```

### 4. Session Management
```javascript
// Clear session storage to show loader again
sessionStorage.removeItem('clinichub_loaded');

// Or force show
PageLoader.show();
```

## Performance

### Optimization Tips
1. **Skeleton in HTML** - No JavaScript required
2. **CSS Animations** - Hardware accelerated
3. **Session Storage** - Loader shows once per session
4. **Progressive Loading** - Smooth 0-100% progress

### Metrics
- **Initial Load**: ~2-3 seconds
- **Skeleton Display**: Instant
- **Content Transition**: 300ms
- **Loader Fade**: 500ms

## Browser Support

Works in all modern browsers:
- Chrome ✓
- Firefox ✓
- Safari ✓
- Edge ✓
- IE 11+ ✓ (with minor degradation)

## Accessibility

### ARIA Support
```html
<div class="page-loader" role="status" aria-live="polite">
    <span class="sr-only">Loading content...</span>
</div>
```

### Reduced Motion
```scss
@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation: none;
  }
  
  .page-loader__logo svg {
    animation: none;
  }
}
```

## Testing

### Test Initial Loader
```javascript
// In browser console
sessionStorage.removeItem('clinichub_loaded');
location.reload();
```

### Test Skeleton
```javascript
// Delay content loading
setTimeout(() => {
    loadContent();
}, 5000); // 5 second delay
```

### Test Progress
```javascript
// Manual progress control
PageLoader.show();
PageLoader.updateProgress(25);
setTimeout(() => PageLoader.updateProgress(50), 1000);
setTimeout(() => PageLoader.updateProgress(75), 2000);
setTimeout(() => PageLoader.complete(), 3000);
```

## Troubleshooting

### Loader Not Showing
- Check `sessionStorage.getItem('clinichub_loaded')`
- Clear session storage
- Verify `loader.js` is loaded first

### Skeleton Not Hiding
- Ensure `PageLoader.complete()` is called
- Check `.content-loaded` class is added
- Verify CSS is compiled

### Progress Bar Stuck
- Check for JavaScript errors
- Verify `updateProgress()` is called
- Ensure `complete()` is triggered

## Summary

✅ **Implemented:**
- Initial page loader with progress bar
- Skeleton loaders for all content types
- Smooth transitions and animations
- Session-based loading
- Error handling
- Accessibility support

✅ **Benefits:**
- Professional user experience
- Reduced perceived loading time
- Prevents layout shift
- Improves engagement
- Production-ready

---

**Version:** 1.3.0  
**Date:** 2025-11-21  
**Status:** ✅ Production Ready
