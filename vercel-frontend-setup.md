# Vercel Frontend Deployment Guide

## Step 1: Prepare Your Frontend
```bash
cd frontend
npm install
npm run build
```

## Step 2: Create Vercel Account & Deploy
1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub (recommended)
3. Click "New Project"
4. Select your GitHub repository
5. Vercel will auto-detect Next.js configuration

## Step 3: Environment Variables in Vercel
In Vercel Dashboard → Project Settings → Environment Variables, add:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

## Step 4: Deploy
Click "Deploy" - Vercel will automatically:
- Build your Next.js app
- Optimize images
- Deploy to global CDN

Your site will be live at: `https://your-project-name.vercel.app`

---

## Common Issues & Fixes

### Issue: API calls fail after deployment
**Solution**: Update `NEXT_PUBLIC_API_URL` to your deployed backend URL

### Issue: Images not loading
**Solution**: Already handled - `next.config.js` has `unoptimized: true`

### Issue: Environment variables not working
**Solution**: 
- Must start with `NEXT_PUBLIC_` to be accessible from frontend
- Rebuild/redeploy after adding variables
