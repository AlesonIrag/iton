# Deploy to Vercel

Your portfolio is ready to deploy! Follow these simple steps:

## Method 1: Deploy via Vercel Website (Easiest)

### Step 1: Push to GitHub
1. Create a new repository on GitHub
2. In your terminal, run:
```bash
git init
git add .
git commit -m "Initial commit - Portfolio"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to https://vercel.com/
2. Sign up/Login (use GitHub account)
3. Click "Add New Project"
4. Import your GitHub repository
5. Vercel will auto-detect it's a Vite project
6. Click "Deploy"
7. Done! Your site will be live in ~2 minutes

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
```bash
vercel
```

Follow the prompts and your site will be deployed!

## Build Settings (Auto-detected by Vercel)

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

## After Deployment

Your portfolio will be live at: `https://your-project-name.vercel.app`

You can:
- ✅ Add a custom domain
- ✅ Auto-deploy on every git push
- ✅ View analytics
- ✅ Enable HTTPS (automatic)

## Important Notes

1. **Admin Mode:** Triple-click your name to enable admin features
2. **Profile Pictures:** Saved in browser localStorage (per device)
3. **Footer Edits:** Saved in browser localStorage (per device)
4. **Contact Form:** Uses mailto: (opens visitor's email client)

## Custom Domain (Optional)

1. Go to your project on Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS instructions

---

**Need help?** Check Vercel docs: https://vercel.com/docs
