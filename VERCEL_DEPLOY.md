# 🚀 Deploy E.D.I.T.H to Vercel

## Quick Deploy (Recommended)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your GitHub repository: `spidy-nyx/EDITH`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset:** Vite
   - **Root Directory:** `edith-app`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app will be live! 🎉

---

## Option 2: Deploy via Vercel CLI

### Install Vercel CLI
```bash
npm install -g vercel
```

### Login to Vercel
```bash
vercel login
```

### Deploy
```bash
# From project root
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? edith-ai
# - Directory? edith-app
# - Override settings? No
```

### Deploy to Production
```bash
vercel --prod
```

---

## Configuration Details

### Build Settings
- **Framework:** Vite
- **Root Directory:** `edith-app`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`
- **Node Version:** 18.x (automatic)

### Environment Variables (Optional)
If you want to set default API keys:
- `VITE_GROQ_API_KEY` - Groq API key
- `VITE_GEMINI_API_KEY` - Gemini API key
- `VITE_OPENAI_API_KEY` - OpenAI API key

**Note:** Users can still add their own keys via the UI!

---

## After Deployment

### Your Live URL
Vercel will give you a URL like:
- `https://edith-ai.vercel.app`
- Or your custom domain

### Test Your Deployment
1. Visit your Vercel URL
2. Complete onboarding
3. Test voice input
4. Try all features:
   - Dashboard
   - Games (trivia, achievements)
   - Quick commands
   - Easter eggs

### Custom Domain (Optional)
1. Go to Vercel Dashboard
2. Select your project
3. Go to "Settings" → "Domains"
4. Add your custom domain
5. Follow DNS instructions

---

## Automatic Deployments

### Production Branch
- Every push to `main` branch = automatic production deployment
- Vercel builds and deploys automatically

### Preview Deployments
- Every pull request = preview deployment
- Test changes before merging

---

## Troubleshooting

### Build Fails
**Error:** "Command failed"
**Solution:** 
```bash
# Test build locally first
cd edith-app
npm install
npm run build
```

### Wrong Directory
**Error:** "No package.json found"
**Solution:** Set Root Directory to `edith-app` in Vercel settings

### Environment Variables
**Error:** API keys not working
**Solution:** Add them in Vercel Dashboard → Settings → Environment Variables

### 404 Errors
**Error:** Routes not working
**Solution:** Already configured in `vercel.json` with rewrites

---

## Performance Tips

### Optimize Build
Already optimized:
- ✅ Vite production build
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification
- ✅ Gzip compression

### CDN
- ✅ Vercel Edge Network (automatic)
- ✅ Global CDN
- ✅ Fast loading worldwide

---

## Monitoring

### Vercel Analytics (Free)
1. Go to your project dashboard
2. Click "Analytics"
3. See:
   - Page views
   - Unique visitors
   - Performance metrics
   - Geographic data

### Vercel Speed Insights (Free)
1. Enable in project settings
2. Get real user metrics
3. Performance scores
4. Core Web Vitals

---

## Update Deployment

### Automatic Updates
```bash
# Just push to GitHub
git add .
git commit -m "Update features"
git push origin main

# Vercel auto-deploys!
```

### Manual Redeploy
1. Go to Vercel Dashboard
2. Select project
3. Click "Deployments"
4. Click "..." on latest
5. Click "Redeploy"

---

## Cost

### Free Tier Includes:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Preview deployments
- ✅ Analytics
- ✅ Custom domains

**Perfect for E.D.I.T.H!** 🕷️

---

## Example Deployment

### Step-by-Step with Screenshots

1. **Import Repository**
   ```
   Vercel Dashboard → Add New → Project
   → Select GitHub → Choose EDITH repo
   ```

2. **Configure**
   ```
   Framework: Vite
   Root Directory: edith-app
   Build Command: npm run build
   Output Directory: dist
   ```

3. **Deploy**
   ```
   Click "Deploy" button
   Wait 2-3 minutes
   ✅ Deployment successful!
   ```

4. **Visit Your Site**
   ```
   https://your-project.vercel.app
   ```

---

## Vercel.json Configuration

Already created in project root:
```json
{
  "buildCommand": "cd edith-app && npm install && npm run build",
  "outputDirectory": "edith-app/dist",
  "devCommand": "cd edith-app && npm run dev",
  "installCommand": "cd edith-app && npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## Next Steps After Deployment

1. ✅ Test all features
2. ✅ Share your URL
3. ✅ Add custom domain (optional)
4. ✅ Enable analytics
5. ✅ Monitor performance

---

## Support

### Vercel Documentation
- https://vercel.com/docs

### E.D.I.T.H Issues
- GitHub Issues: https://github.com/spidy-nyx/EDITH/issues

---

**Ready to deploy?** 🚀

Just go to https://vercel.com and import your GitHub repo!

Your E.D.I.T.H will be live in minutes! 🕷️
