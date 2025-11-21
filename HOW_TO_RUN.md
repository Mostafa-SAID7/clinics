# How to Run ClinicHub

## Quick Start

### Option 1: Using Built-in Server ⭐ RECOMMENDED

```bash
# Start the server
npm start
```

Then open your browser to: **http://localhost:8080**

### Option 2: Using Live Server (VS Code Extension)

1. Install **Live Server** extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Browser will open automatically at `http://localhost:5500`

### Option 3: Using Node.js (npx serve)

```bash
# Install serve globally (one-time)
npm install -g serve

# Run the server
serve . -p 8000

# Or use npx (no installation needed)
npx serve . -p 8000
```

Then open: `http://localhost:8000`

### Option 4: Using Python

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000`

### Option 5: Using PHP

```bash
php -S localhost:8000
```

Then open: `http://localhost:8000`

### Option 6: Direct File Access (Limited)

Simply open `index.html` in your browser by double-clicking it.

**Note:** Some features may not work due to CORS restrictions (AJAX requests for JSON files).

## What You'll See

### First Visit
1. **Loading Screen** - Beautiful progress bar (0-100%)
2. **Skeleton Loaders** - Content placeholders while data loads
3. **Full Content** - Complete website with all features

### Features to Test

✅ **Theme Toggle** - Click moon/sun icon in header  
✅ **Language Toggle** - Click EN/AR button in header  
✅ **AI Chat** - Click chat icon (bottom right)  
✅ **Navigation** - Browse all pages  
✅ **Responsive** - Resize browser window  
✅ **Form Auto-save** - Fill appointment form  

## Troubleshooting

### Issue: Blank Page or Errors

**Solution:** Use a local server (Options 1-4), not direct file access.

### Issue: Data Not Loading

**Check:**
- Server is running
- Console for errors (F12)
- JSON files exist in `data/` folder

### Issue: Styles Not Applied

**Solution:**
```bash
# Recompile SASS
npm run sass
```

### Issue: Loader Keeps Showing

**Solution:**
```javascript
// In browser console
sessionStorage.clear();
location.reload();
```

## Development Mode

### Watch SASS Changes

```bash
npm run sass:watch
```

This will automatically recompile CSS when you edit SCSS files.

### Browser DevTools

Press `F12` to open DevTools and check:
- **Console** - JavaScript errors
- **Network** - AJAX requests
- **Application** - localStorage/sessionStorage

## Project Structure

```
ClinicHub/
├── index.html              # Home page
├── pages/                  # Other pages
│   ├── services.html
│   ├── doctors.html
│   ├── appointment.html
│   ├── contact.html
│   └── about.html
├── assets/
│   ├── css/               # Compiled CSS
│   ├── scss/              # SASS source
│   └── js/                # JavaScript
├── data/
│   ├── en/                # English data files
│   ├── ar/                # Arabic data files
│   └── README.md          # Data structure docs
├── server.js              # Built-in Node.js server
└── docs/                  # Documentation
```

## Browser Requirements

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Tips

1. **First Load** - May take 2-3 seconds (loading data)
2. **Subsequent Loads** - Instant (cached data)
3. **Clear Cache** - Hard refresh (Ctrl+Shift+R)

## Testing Checklist

- [ ] Home page loads
- [ ] All navigation links work
- [ ] Theme toggle works
- [ ] Language toggle works
- [ ] AI chat opens and responds
- [ ] Forms validate properly
- [ ] Mobile responsive (resize window)
- [ ] All pages load correctly

## Production Deployment

For production, you can deploy to:
- **Netlify** - Drag & drop folder
- **Vercel** - Connect GitHub repo
- **GitHub Pages** - Push to gh-pages branch
- **Any static host** - Upload files via FTP

## Support

If you encounter issues:
1. Check browser console (F12)
2. Verify all files are present
3. Ensure server is running
4. Clear browser cache
5. Check documentation in `docs/` folder

---

**Enjoy your ClinicHub experience!** 🏥✨
