# 🚀 Vercel Deployment Guide for Bhraman

This guide will help you deploy your Bhraman tourism platform to Vercel for production use.

## Prerequisites

- GitHub account with Bhraman repository
- Vercel account (free tier available)
- MongoDB Atlas account for database
- Google Gemini API key

## Quick Deployment

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AmdCOdePuLsE/Bhraman)

1. Click the deploy button above
2. Connect your GitHub account
3. Fork/import the repository
4. Configure environment variables (see below)
5. Deploy!

### Option 2: Manual Deployment

1. **Connect Repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
  - Import your Bhraman repository

2. **Configure Project Settings**
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

## Environment Variables Configuration

Navigate to your Vercel project dashboard → Settings → Environment Variables

### Required Variables (CRITICAL for deployment success)

```env
# Database - MUST BE SET
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bhraman?retryWrites=true&w=majority

# Authentication - MUST BE SET  
JWT_SECRET=your_super_secure_jwt_secret_minimum_32_characters

# AI Configuration - MUST BE SET
GEMINI_API_KEY=your_gemini_api_key

# Weather API (Optional - has fallback data)
RAPIDAPI_WEATHER_KEY=your_rapidapi_weather_key
```

### Getting API Keys

#### 1. Google Gemini AI API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create new API key
3. Copy the key (starts with `AIza...`)

#### 2. MongoDB Atlas (Recommended for Production)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create database user
4. Get connection string
5. Replace password and database name

#### 3. RapidAPI Weather (Optional)
1. Sign up at [RapidAPI](https://rapidapi.com)
2. Subscribe to [WeatherAPI.com endpoint](https://rapidapi.com/weatherapi/api/weatherapi-com)
3. Get free API key
4. Note: App has fallback weather data if this fails

## Build Configuration

Vercel automatically detects Next.js projects. No additional configuration needed.

### Custom Build Settings (if needed)

If you need custom build settings, create `vercel.json`:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "env": {
    "NODE_ENV": "production"
  }
}
```

## Domain Configuration

### Using Vercel Domain
- Your app will be available at `https://your-app-name.vercel.app`
- Automatically gets SSL certificate

### Custom Domain
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as shown
4. SSL certificate auto-generated

## Performance Optimization

### Recommended Settings

1. **Enable Edge Functions**
   ```json
   // In vercel.json
   {
     "functions": {
       "app/api/ai/**/*.ts": {
         "runtime": "edge"
       }
     }
   }
   ```

2. **Image Optimization**
   ```js
   // In next.config.js
   module.exports = {
     images: {
       domains: ['your-image-domain.com'],
       formats: ['image/webp', 'image/avif'],
     },
   }
   ```

3. **Caching Strategy**
   ```js
   // In API routes
   export async function GET() {
     return NextResponse.json(data, {
       headers: {
         'Cache-Control': 's-maxage=3600, stale-while-revalidate'
       }
     })
   }
   ```

## Monitoring & Analytics

### Built-in Vercel Analytics
1. Go to your project dashboard
2. Enable Analytics
3. View performance metrics

### Custom Analytics
Add to your `app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check environment variables are set
   - Verify all dependencies in package.json
   - Check TypeScript errors

2. **API Timeouts**
   - Increase function timeout in vercel.json
   - Optimize database queries
   - Add error handling

3. **Environment Variable Issues**
   - Ensure all required variables are set
   - Check for typos in variable names
   - Verify API keys are valid

### Debug Logs
- View build logs in Vercel dashboard
- Check function logs for API errors
- Use `console.log` for debugging (temporary)

## Continuous Deployment

### Automatic Deployments
- Every push to `main` branch triggers production deployment
- Pull requests get preview deployments
- Feature branches get preview URLs

### Branch Configuration
1. Go to Project Settings → Git
2. Configure production branch (main)
3. Set up preview deployments

## Security Best Practices

1. **Environment Variables**
   - Never commit API keys to git
   - Use strong, unique secrets
   - Rotate keys regularly

2. **API Security**
   - Implement rate limiting
   - Validate all inputs
   - Use HTTPS only

3. **Database Security**
   - Use MongoDB Atlas with IP restrictions
   - Regular security updates
   - Monitor access logs

## Production Checklist

- [ ] All environment variables configured
- [ ] API keys working and valid
- [ ] Build successful
- [ ] All features tested
- [ ] Performance optimized
- [ ] Analytics enabled
- [ ] Custom domain configured (optional)
- [ ] Error monitoring setup

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Project Issues**: [GitHub Issues](https://github.com/AmdCOdePuLsE/Bhraman/issues)

---

🎉 **Congratulations!** Your Bhraman tourism platform is now live on Vercel!

Share your deployment URL and start showcasing the beautiful heritage of West Bengal to the world! 🏛️✨
