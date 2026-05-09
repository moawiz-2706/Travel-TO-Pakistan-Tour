# Backend Deployment Guide (3 Options)

## Option 1: Railway.app (RECOMMENDED - Easiest)
[Railway.app](https://railway.app) has free tier perfect for portfolios

### Steps:
1. Push your code to GitHub
2. Go to Railway.app and sign up with GitHub
3. Click "New Project" → "Deploy from GitHub"
4. Select your repository
5. Add MongoDB plugin (Railway can provision MongoDB for you)
6. Add Environment Variables:
   - MONGODB_URI
   - SESSION_SECRET
   - JWT_SECRET
   - NODE_ENV=production
   - CORS_ORIGIN=your-vercel-frontend-url

7. Railway auto-deploys on every push
8. Get your backend URL: `https://your-backend.railway.app`

**Cost**: Free tier available, sufficient for portfolio projects

---

## Option 2: Render.com (Good Alternative)
[Render.com](https://render.com) - Free tier with auto-deploy

### Steps:
1. Go to Render.com and sign up
2. Click "New +" → "Web Service"
3. Connect GitHub repo
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Add Environment Variables (same as above)
6. Choose Free tier
7. Deploy!

**Cost**: Free tier available

---

## Option 3: Vercel Serverless Functions (Advanced)
Convert Express routes to serverless functions

**Pros**: Same platform as frontend, free tier  
**Cons**: Requires code restructuring

Requires creating `api/` folder with individual route handlers

---

## IMPORTANT: Update CORS in Backend

Update `Backend/server.js`:

**Current (localhost only):**
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'http://172.17.0.4:3000'],
  credentials: true,
}));
```

**Update to (production):**
```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',  // Development
    'https://your-vercel-app.vercel.app'  // Production
  ],
  credentials: true,
}));
```

---

## Connection String Format

MongoDB Atlas connection string format:
```
mongodb+srv://username:password@cluster-name.mongodb.net/database-name?retryWrites=true&w=majority
```

Make sure to:
- Replace `username` and `password`
- Replace `cluster-name`
- Choose your `database-name`
- Whitelist Vercel IP ranges in MongoDB Atlas
