# AJAX Implementation Guide

## Overview

ClinicHub now uses **AJAX (XMLHttpRequest)** for all data fetching operations instead of the Fetch API. This provides better compatibility, more control over requests, and improved error handling.

## Architecture

### Core Module: `ajax-utils.js`

A reusable utility module that provides:
- GET requests
- POST requests
- JSON loading
- Multiple file loading
- URL accessibility checking
- Timeout handling
- Error handling

### Implementation Files

1. **assets/js/ajax-utils.js** - Core AJAX utility module
2. **assets/js/data-loader.js** - Data fetching with AJAX
3. **assets/js/i18n.js** - Translation loading with AJAX

## Features

### ✅ AJAX Utilities

```javascript
// Load single JSON file
const data = await AjaxUtils.loadJSON('data/data.json');

// Load multiple JSON files
const [data1, data2] = await AjaxUtils.loadMultipleJSON([
    'data/data.json',
    'data/translations.json'
]);

// Make GET request
const response = await AjaxUtils.get('/api/endpoint');

// Make POST request
const response = await AjaxUtils.post('/api/endpoint', {
    name: 'John',
    email: 'john@example.com'
});

// Check URL accessibility
const isAccessible = await AjaxUtils.checkURL('data/data.json');
```

### ✅ Configuration Options

```javascript
const config = {
    timeout: 10000,  // 10 seconds
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token'
    }
};

const response = await AjaxUtils.get('/api/endpoint', config);
```

### ✅ Error Handling

All AJAX requests include comprehensive error handling:
- Network errors
- Timeout errors
- HTTP status errors
- JSON parsing errors

```javascript
try {
    const data = await AjaxUtils.loadJSON('data/data.json');
    console.log('✓ Data loaded successfully');
} catch (error) {
    console.error('✗ Error loading data:', error);
    // Handle error appropriately
}
```

## Benefits Over Fetch API

### 1. **Better Browser Compatibility**
- Works in older browsers
- No polyfill required
- Native XMLHttpRequest support

### 2. **More Control**
- Request timeout configuration
- Progress monitoring capability
- Request abortion support
- Detailed error information

### 3. **Synchronous Option**
- Can be used synchronously if needed
- Better for legacy code integration

### 4. **Better Error Handling**
- Network errors are caught properly
- Timeout errors are explicit
- HTTP errors are clear

## Usage Examples

### Loading Site Data

```javascript
// In data-loader.js
const fetchData = async () => {
    if (cachedData) {
        return cachedData;
    }
    
    try {
        cachedData = await AjaxUtils.loadJSON(DATA_PATH);
        console.log('✓ Data loaded successfully via AJAX');
        return cachedData;
    } catch (error) {
        console.error('✗ Error loading data:', error);
        return null;
    }
};
```

### Loading Translations

```javascript
// In i18n.js
const loadTranslations = async () => {
    try {
        translations = await AjaxUtils.loadJSON(TRANSLATIONS_PATH);
        console.log('✓ Translations loaded successfully via AJAX');
        return translations;
    } catch (error) {
        console.error('✗ Error loading translations:', error);
        return null;
    }
};
```

### Form Submission (Future Use)

```javascript
// Example for future API integration
const submitAppointment = async (formData) => {
    try {
        const response = await AjaxUtils.post('/api/appointments', formData);
        console.log('✓ Appointment submitted:', response.data);
        return response.data;
    } catch (error) {
        console.error('✗ Error submitting appointment:', error);
        throw error;
    }
};
```

## Response Format

All AJAX requests return a standardized response object:

```javascript
{
    data: {...},           // Parsed response data
    status: 200,           // HTTP status code
    statusText: 'OK',      // HTTP status text
    headers: '...'         // Response headers
}
```

## Timeout Configuration

Default timeout is **10 seconds** (10000ms). Can be customized:

```javascript
const response = await AjaxUtils.get('/api/endpoint', {
    timeout: 5000  // 5 seconds
});
```

## Fallback Mechanism

Both `data-loader.js` and `i18n.js` include fallback XMLHttpRequest implementations if `AjaxUtils` is not available:

```javascript
if (typeof AjaxUtils !== 'undefined') {
    // Use AjaxUtils
    data = await AjaxUtils.loadJSON(path);
} else {
    // Fallback to direct XMLHttpRequest
    data = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        // ... implementation
    });
}
```

## Script Loading Order

**Important:** Load scripts in this order:

```html
<!-- 1. AJAX Utilities (must be first) -->
<script src="assets/js/ajax-utils.js"></script>

<!-- 2. Core modules that use AJAX -->
<script src="assets/js/i18n.js"></script>
<script src="assets/js/data-loader.js"></script>

<!-- 3. Other modules -->
<script src="assets/js/theme.js"></script>
<script src="assets/js/chat-ai.js"></script>
<script src="assets/js/main.js"></script>

<!-- 4. Page-specific scripts -->
<script src="assets/js/home.js"></script>
```

## Performance Considerations

### Caching
- Data is cached after first load
- Translations are cached after first load
- Reduces redundant network requests

### Parallel Loading
Use `loadMultipleJSON` for parallel requests:

```javascript
// Load multiple files in parallel
const [data, translations] = await AjaxUtils.loadMultipleJSON([
    'data/data.json',
    'data/translations.json'
]);
```

### Request Optimization
- 10-second timeout prevents hanging
- Automatic JSON parsing
- Content-Type detection

## Error Messages

Clear, descriptive error messages:
- ✓ Success: "Data loaded successfully via AJAX"
- ✗ Network: "Network error occurred"
- ✗ Timeout: "Request timeout after 10000ms"
- ✗ HTTP: "HTTP 404: Not Found"
- ✗ Parse: "Failed to parse JSON: ..."

## Browser Support

Works in all modern browsers and IE10+:
- Chrome ✓
- Firefox ✓
- Safari ✓
- Edge ✓
- IE 10+ ✓

## Future Enhancements

Potential additions:
- [ ] Request progress monitoring
- [ ] Request cancellation
- [ ] Request retry logic
- [ ] Request queuing
- [ ] Response caching strategies
- [ ] Request interceptors
- [ ] Response transformers

## Migration Notes

### From Fetch API

**Before (Fetch):**
```javascript
const response = await fetch('data/data.json');
const data = await response.json();
```

**After (AJAX):**
```javascript
const data = await AjaxUtils.loadJSON('data/data.json');
```

### Benefits
- Single line instead of two
- Automatic error handling
- Timeout support
- Better compatibility

## Testing

To test AJAX functionality:

1. Open browser DevTools
2. Go to Network tab
3. Reload page
4. Check for XHR requests to:
   - `data/data.json`
   - `data/translations.json`
5. Verify status codes (200 OK)
6. Check console for success messages

## Troubleshooting

### Issue: "Network error occurred"
- Check file paths
- Verify JSON files exist
- Check CORS settings (if using server)

### Issue: "Request timeout"
- Increase timeout value
- Check network connection
- Verify server response time

### Issue: "Failed to parse JSON"
- Validate JSON syntax
- Check file encoding (UTF-8)
- Verify Content-Type header

## Summary

✅ **Implemented:**
- Complete AJAX utility module
- Data loading with AJAX
- Translation loading with AJAX
- Error handling
- Timeout management
- Fallback mechanisms

✅ **Benefits:**
- Better compatibility
- More control
- Improved error handling
- Production-ready
- Future-proof

---

**Version:** 1.2.0  
**Date:** 2025-11-21  
**Status:** ✅ Production Ready
