# Deployment Guide

This guide covers deploying the Cursor Config Generator to various platforms.

## 🚀 Quick Deploy

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or visit [vercel.com](https://vercel.com)
2. Import your Git repository
3. Vercel will automatically detect Next.js
4. Click "Deploy"
5. Done! Your app is live

**Configuration:**
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Click the button above
2. Connect your Git repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Click "Deploy site"

**netlify.toml** (optional):
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Railway

1. Visit [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Railway auto-detects Next.js configuration
5. Deploy!

### Docker Deployment

**Dockerfile:**
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

**Build and Run:**
```bash
# Build image
docker build -t cursor-config .

# Run container
docker run -p 3000:3000 cursor-config
```

**Docker Compose:**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

## 🌐 Platform-Specific Notes

### Vercel
- ✅ Zero configuration
- ✅ Automatic HTTPS
- ✅ Edge network CDN
- ✅ Free tier available
- ✅ GitHub integration

**Pros:**
- Best Next.js support
- Fastest deployment
- Automatic previews for PRs

### Netlify
- ✅ Simple deployment
- ✅ Free tier
- ✅ Good Next.js support

**Note:** Requires `@netlify/plugin-nextjs` for full Next.js features

### Railway
- ✅ Simple deployment
- ✅ Automatic scaling
- ✅ Database support (if needed later)

### Self-Hosted (VPS/Cloud)

**Requirements:**
- Node.js 18+
- PM2 or similar process manager

**Setup:**
```bash
# Install dependencies
npm install

# Build application
npm run build

# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start npm --name "cursor-config" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 startup
pm2 startup
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔧 Environment Variables

This application doesn't require environment variables for basic functionality. If you add features that need them:

1. Create `.env.local` for local development
2. Add variables to your deployment platform:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Build & deploy → Environment
   - Railway: Variables tab in your project

## 📊 Build Optimization

### Next.js Configuration

Current `next.config.ts` is minimal. For optimization:

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone', // For Docker
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header
  
  // Image optimization (if using next/image)
  images: {
    domains: [], // Add domains if loading external images
  },
};

export default nextConfig;
```

### Performance Tips

1. **Enable compression** (already in config)
2. **Use CDN** for static assets (automatic on Vercel/Netlify)
3. **Monitor bundle size**: `npm run build` shows size info
4. **Analyze bundle**: 
   ```bash
   npm install --save-dev @next/bundle-analyzer
   ```

## 🔒 Security

### Production Checklist

- [ ] Remove console.logs from production code
- [ ] Set up HTTPS (automatic on most platforms)
- [ ] Add security headers
- [ ] Implement rate limiting (if needed)
- [ ] Keep dependencies updated

### Security Headers (next.config.ts)

```typescript
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
    ];
  },
};
```

## 📈 Monitoring

### Vercel Analytics

```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
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

## 🐛 Troubleshooting

### Build Fails

**Issue:** "Module not found"
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Issue:** TypeScript errors
```bash
# Check TypeScript
npx tsc --noEmit
```

### Runtime Issues

**Issue:** 404 on routes
- Ensure all routes are in `app/` directory
- Check Next.js version compatibility

**Issue:** Slow performance
- Check bundle size: `npm run build`
- Enable Next.js compression
- Use CDN for static assets

## ✅ Post-Deployment

After deploying:

1. ✅ Test all functionality
2. ✅ Verify forms work correctly
3. ✅ Test file generation
4. ✅ Check mobile responsiveness
5. ✅ Test download/copy features
6. ✅ Monitor performance
7. ✅ Set up error tracking (optional)

## 🎉 You're Live!

Your Cursor Config Generator is now deployed and ready to use!

Share it with your team and start generating professional development documentation.

---

**Need help?** Check the [README.md](./README.md) or create an issue in the repository.

