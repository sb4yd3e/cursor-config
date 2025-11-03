# Static Deployment Guide

This application is configured for **static export** (SPA mode) and can be deployed to any static hosting service.

## 🚀 Build for Production

```bash
# Build static export
npm run build

# Output will be in 'out/' directory
```

## 📦 Deployment Options

### 1. Vercel (Recommended)

**Method 1: Using Vercel CLI**
```bash
npm install -g vercel
vercel --prod
```

**Method 2: Git Integration**
1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy automatically

**No configuration needed!** Vercel automatically detects Next.js static export.

### 2. Netlify

**Method 1: Drag & Drop**
1. Build: `npm run build`
2. Drag `out/` folder to [Netlify Drop](https://app.netlify.com/drop)

**Method 2: Git Integration**
1. Connect repository to Netlify
2. Configure:
   - Build command: `npm run build`
   - Publish directory: `out`
3. Deploy

**netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. GitHub Pages

```bash
# Build
npm run build

# Deploy (using gh-pages)
npm install -g gh-pages
gh-pages -d out -b gh-pages
```

**Or using GitHub Actions:**

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

### 4. Cloudflare Pages

**Method 1: Dashboard**
1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Connect your repository
3. Configure:
   - Build command: `npm run build`
   - Build output directory: `out`

**Method 2: Wrangler CLI**
```bash
npm install -g wrangler
wrangler pages publish out
```

### 5. Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Configure:
# - Public directory: out
# - Single-page app: Yes
# - GitHub auto deploys: Optional

# Deploy
firebase deploy
```

**firebase.json:**
```json
{
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### 6. AWS S3 + CloudFront

```bash
# Build
npm run build

# Sync to S3
aws s3 sync out/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### 7. Self-Hosted (Nginx)

```bash
# Build
npm run build

# Copy to web server
scp -r out/* user@server:/var/www/html/

# Or serve locally
npm start
# Serves on http://localhost:3000
```

**Nginx configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

## 🔍 Testing Locally

```bash
# Build
npm run build

# Serve locally
npm start

# Or use any static server
npx serve out
```

## 📝 Important Notes

### Static Export Limitations

✅ **Works:**
- All client-side functionality
- Dynamic file generation
- Form handling
- Local storage
- Client-side routing

❌ **Not Available:**
- Server-side API routes
- Server-side rendering (SSR)
- Incremental Static Regeneration (ISR)
- Image optimization (images are unoptimized)

### Performance Optimizations

All generators run **client-side** for static compatibility:
- Fast initial load
- No server required
- Can work offline after first load
- Perfect for CDN deployment

## 🌐 Custom Domain

### Vercel
```bash
vercel domains add your-domain.com
```

### Netlify
1. Go to Domain settings
2. Add custom domain
3. Configure DNS

### Cloudflare Pages
1. Go to Custom domains
2. Add your domain
3. Configure DNS (automatic with Cloudflare)

## 🔒 HTTPS

All mentioned platforms provide **free HTTPS** automatically:
- Vercel: Automatic SSL
- Netlify: Let's Encrypt
- Cloudflare: Universal SSL
- Firebase: Automatic SSL
- GitHub Pages: Automatic SSL

## 📊 Analytics (Optional)

Add analytics to `app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## ✅ Deployment Checklist

Before deploying:
- [ ] Run `npm run build` successfully
- [ ] Test `npm start` locally
- [ ] Check all features work
- [ ] Verify file generation works
- [ ] Test on different browsers
- [ ] Check mobile responsiveness
- [ ] Update README with live URL
- [ ] Configure custom domain (if needed)

## 🎉 Deploy Now!

Choose your platform and deploy in minutes. The app is **100% static** and works perfectly on any static hosting!

**Recommended platforms:**
1. 🥇 Vercel - Best for Next.js, zero config
2. 🥈 Netlify - Great DX, easy setup
3. 🥉 Cloudflare Pages - Fast global CDN

---

**Need help?** Check platform-specific documentation or create an issue.

