# Tach Haus Website

Movement with Purpose - A curated road rally for automotive enthusiasts giving back to communities.

## 🚀 Deployment to Cloudflare Pages

This website is ready to deploy to Cloudflare Pages. Follow these steps:

### Method 1: Direct Upload (Recommended for Quick Start)

1. **Login to Cloudflare Dashboard**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Navigate to **Pages** in the left sidebar

2. **Create New Project**
   - Click **Create a project**
   - Choose **Upload assets** (Direct Upload)

3. **Upload Your Files**
   - Upload all files from this directory:
     - `index.html`
     - `styles.css`
     - `script.js`
   
4. **Deploy**
   - Give your project a name (e.g., "tach-haus")
   - Click **Deploy site**
   - Your site will be live at `https://your-project-name.pages.dev`

### Method 2: Git Integration (Recommended for Ongoing Development)

1. **Initialize Git Repository** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub/GitLab**
   ```bash
   git remote add origin YOUR_REPO_URL
   git branch -M main
   git push -u origin main
   ```

3. **Connect to Cloudflare Pages**
   - Go to Cloudflare Dashboard > Pages
   - Click **Create a project**
   - Choose **Connect to Git**
   - Select your repository
   - Configure build settings:
     - **Build command**: Leave empty (static site)
     - **Build output directory**: `/` (root directory)
   - Click **Save and Deploy**

### Custom Domain Setup

1. In Cloudflare Pages, go to your project
2. Click **Custom domains**
3. Add your domain (e.g., `tachhaus.com`)
4. Cloudflare will automatically configure DNS if your domain is on Cloudflare

## 📁 File Structure

```
Tach Haus Site/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## ✨ Features

- **Fully Responsive Design** - Works perfectly on all devices
- **Optimized Performance** - Fast loading times with optimized assets
- **Accessibility Compliant** - WCAG 2.1 guidelines followed
- **SEO Optimized** - Proper meta tags and structured data
- **Modern Browser Support** - Works on all modern browsers

## 🛠 Local Development

To test the site locally:

1. **Simple HTTP Server (Python)**
   ```bash
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`

2. **Node.js HTTP Server**
   ```bash
   npx serve
   ```

3. **VS Code Live Server**
   - Install "Live Server" extension
   - Right-click `index.html` > "Open with Live Server"

## 🔧 Customization

### Updating Content

- **Text Content**: Edit `index.html`
- **Styling**: Modify `styles.css`
- **Functionality**: Update `script.js`

### Changing Images

All images are currently hosted on Webflow's CDN. To use your own images:

1. Upload images to Cloudflare Images or another CDN
2. Replace the image URLs in `index.html`

### Updating Colors

The main brand colors are defined in `styles.css`:
- Yellow: `#F3E11B`
- Red: `#CC0000`
- Dark Gray: `#3a4042`

Search and replace these values in `styles.css` to change the color scheme.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security

- All external links use `rel="noopener noreferrer"` for security
- No inline scripts (except initialization)
- CSP-friendly code structure

## 📊 Performance Optimizations

- **Lazy Loading**: Images load as needed
- **Font Optimization**: Fonts preloaded and display optimized
- **Minification Ready**: CSS and JS can be minified for production
- **CDN Assets**: External resources loaded from CDN

## 🎯 SEO Features

- Semantic HTML5 structure
- Proper heading hierarchy
- Meta descriptions and Open Graph tags
- Alt text for all images
- Structured navigation with ARIA labels

## 📝 License

© 2025 Tach Haus LLC / THE TACH HAUS FOUNDATION. All rights reserved.

## 🤝 Support

For issues or questions about deployment, contact your web administrator or refer to:
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Community](https://community.cloudflare.com/)

---

**Built with ❤️ for the Tach Haus community**

