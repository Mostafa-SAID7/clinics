# 🚀 ClinicHub Deployment Guide

Complete guide to deploy your ClinicHub website to various hosting platforms.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:
- [x] All data files are in place (`data/en/`, `data/ar/`, `data/translations.json`)
- [x] SASS is compiled to CSS (`npm run build`)
- [x] All pages tested locally
- [x] Language switching works
- [x] Theme toggle works
- [x] No console errors

---

## 🌐 Option 1: Netlify (Recommended - Easiest)

### Method A: Drag & Drop (No Git Required)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Visit Netlify:**
   - Go to https://app.netlify.com/drop
   - Drag your entire project folder onto the page
   - Wait for deployment (usually 30 seconds)
   - Get your live URL: `https://your-site-name.netlify.app`

### Method B: Git Integration (Automatic Updates)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/clinichub.git
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.` (root)
   - Click "Deploy site"

3. **Custom Domain (Optional):**
   - Go to Site settings → Domain management
   - Add custom domain
   - Update DNS records as instructed

**✅ Netlify Features:**
- Free SSL certificate
- Automatic deployments on git push
- Form handling
- Serverless functions support
- CDN included

---

## ⚡ Option 2: Vercel (Fast & Modern)

### Deploy with Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - Choose project name
   - Confirm settings
   - Get your live URL: `https://your-project.vercel.app`

### Deploy with Git Integration

1. **Push to GitHub** (same as Netlify)

2. **Import to Vercel:**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Build settings:
     - Framework Preset: Other
     - Build Command: `npm run build`
     - Output Directory: `.`
   - Click "Deploy"

**✅ Vercel Features:**
- Edge network (super fast)
- Automatic HTTPS
- Git integration
- Preview deployments
- Analytics

---

## 📄 Option 3: GitHub Pages (Free)

1. **Create GitHub repository** and push code

2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `root`
   - Click Save

3. **Build CSS:**
   ```bash
   npm run build
   git add assets/css/main.css
   git commit -m "Add compiled CSS"
   git push
   ```

4. **Access your site:**
   - URL: `https://YOUR_USERNAME.github.io/REPO_NAME/`

**Note:** If using a subdirectory, update paths in HTML files:
```html
<!-- Change from: -->
<link href="assets/css/main.css">
<!-- To: -->
<link href="/REPO_NAME/assets/css/main.css">
```

**✅ GitHub Pages Features:**
- Completely free
- Easy setup
- Good for portfolios
- Custom domain support

---

## 🔷 Option 4: Azure Static Web Apps

1. **Install Azure CLI:**
   ```bash
   npm install -g @azure/static-web-apps-cli
   ```

2. **Login to Azure:**
   ```bash
   az login
   ```

3. **Create Static Web App:**
   - Go to Azure Portal
   - Create new Static Web App
   - Connect to GitHub repository
   - Build settings:
     - App location: `/`
     - Output location: `.`

4. **Deploy automatically** via GitHub Actions

**✅ Azure Features:**
- Enterprise-grade
- Free tier available
- Custom domains
- Authentication built-in

---

## 🐳 Option 5: Docker (Any Platform)

### Create Dockerfile

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Build and Run

```bash
# Build image
docker build -t clinichub .

# Run container
docker run -d -p 80:80 clinichub
```

### Deploy to Cloud

- **AWS ECS**
- **Google Cloud Run**
- **Azure Container Instances**
- **DigitalOcean App Platform**

---

## 📦 Option 6: Traditional Web Hosting (cPanel/FTP)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload via FTP:**
   - Use FileZilla or similar FTP client
   - Upload all files to `public_html` or `www` directory
   - Ensure file permissions are correct (644 for files, 755 for folders)

3. **Access your site:**
   - URL: `https://yourdomain.com`

**Recommended Hosts:**
- Hostinger
- Bluehost
- SiteGround
- NameCheap

---

## 🔧 Build Commands Reference

```bash
# Compile SASS to CSS
npm run sass

# Build for production
npm run build

# Watch SASS changes (development)
npm run sass:watch

# Start local server (testing)
npm start
```

---

## 🌍 Custom Domain Setup

### For Netlify:
1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

### For Vercel:
1. Go to Project settings → Domains
2. Add domain
3. Update DNS:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

---

## 🔒 Security Best Practices

### 1. HTTPS
- All platforms provide free SSL
- Ensure "Force HTTPS" is enabled

### 2. Headers
Already configured in `netlify.toml` and `vercel.json`:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block

### 3. Environment Variables
If you add API keys later:
- Never commit them to Git
- Use platform environment variables
- Add to `.env` file (already in .gitignore)

---

## 📊 Performance Optimization

### Already Implemented:
- ✅ Minified CSS (via SASS compressed output)
- ✅ Optimized images
- ✅ Lazy loading
- ✅ Caching headers
- ✅ CDN delivery (via hosting platforms)

### Additional Optimizations:
1. **Enable Gzip/Brotli** (automatic on Netlify/Vercel)
2. **Add Service Worker** for offline support
3. **Optimize images** further with WebP format
4. **Minify JavaScript** (optional)

---

## 🧪 Testing After Deployment

### 1. Functionality Test
- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Language switching (EN ↔ AR)
- [ ] Theme toggle (Light ↔ Dark)
- [ ] Forms validate properly
- [ ] Chat widget opens
- [ ] Mobile responsive

### 2. Performance Test
- Use Google PageSpeed Insights: https://pagespeed.web.dev/
- Target: 90+ score

### 3. SEO Test
- Use Google Search Console
- Submit sitemap
- Check mobile usability

### 4. Browser Test
- Chrome ✓
- Firefox ✓
- Safari ✓
- Edge ✓
- Mobile browsers ✓

---

## 🆘 Troubleshooting

### Issue: CSS not loading
**Solution:**
```bash
npm run build
git add assets/css/main.css
git commit -m "Update CSS"
git push
```

### Issue: 404 on page refresh
**Solution:** Configure redirects (already in netlify.toml/vercel.json)

### Issue: Data not loading
**Solution:** Check browser console for CORS errors. Ensure JSON files are uploaded.

### Issue: Paths broken on subdirectory
**Solution:** Update paths to be relative or absolute based on deployment location.

---

## 📈 Post-Deployment

### 1. Analytics
Add Google Analytics or similar:
```html
<!-- Add before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### 2. Monitoring
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Monitor performance (Google Analytics, Vercel Analytics)

### 3. SEO
- Submit to Google Search Console
- Create sitemap.xml
- Add meta descriptions
- Optimize for keywords

### 4. Backup
- Keep Git repository updated
- Export database if you add backend later
- Document any custom configurations

---

## 🎯 Recommended Deployment Path

**For Beginners:**
1. ✅ Netlify Drag & Drop (5 minutes)

**For Developers:**
1. ✅ Netlify or Vercel with Git (10 minutes)

**For Enterprise:**
1. ✅ Azure Static Web Apps or AWS Amplify

---

## 📞 Support Resources

- **Netlify Docs:** https://docs.netlify.com/
- **Vercel Docs:** https://vercel.com/docs
- **GitHub Pages:** https://pages.github.com/
- **Azure Static Web Apps:** https://docs.microsoft.com/azure/static-web-apps/

---

## ✅ Quick Deploy Checklist

- [ ] Run `npm run build`
- [ ] Test locally at http://localhost:8080
- [ ] Commit all changes to Git
- [ ] Choose deployment platform
- [ ] Follow platform-specific steps
- [ ] Test deployed site
- [ ] Configure custom domain (optional)
- [ ] Set up analytics (optional)
- [ ] Monitor performance

---

**Your ClinicHub website is ready to go live! 🚀**

Choose your preferred platform and follow the steps above. Most deployments take less than 10 minutes!

**Recommended:** Start with Netlify drag & drop for the fastest deployment.
