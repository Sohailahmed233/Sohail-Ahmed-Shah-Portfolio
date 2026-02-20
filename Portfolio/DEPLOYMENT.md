# GitHub Pages Deployment Guide

This guide walks you through deploying your portfolio website to GitHub Pages.

## Prerequisites

- GitHub account (free at [github.com](https://github.com))
- Git installed on your computer
- Your portfolio files (which you already have!)

## Step 1: Create a GitHub Account (if you don't have one)

1. Go to [github.com](https://github.com)
2. Sign up with your email
3. Verify your email address

## Step 2: Create a New Repository

### Option A: Using `username.github.io` (Recommended - Custom Domain Ready)

If you want your portfolio at `https://username.github.io`:

1. Click the **+** icon → **New repository**
2. Name it: `username.github.io` (replace "username" with your actual GitHub username)
3. Set to **Public**
4. Click **Create repository**

### Option B: Using Any Repository Name

If you prefer a different name like `portfolio`:

1. Click the **+** → **New repository**
2. Name it: `portfolio` (or any name you prefer)
3. Set to **Public**
4. Click **Create repository**
5. Your site will be at: `https://username.github.io/portfolio`

## Step 3: Upload Your Files

### Method 1: Using Git (Command Line)

Open PowerShell or Command Prompt and run:

```bash
# Navigate to your portfolio directory
cd e:\Portfolio

# Initialize git
git init

# Add your GitHub repository as the remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Add all files
git add .

# Create initial commit
git commit -m "Initial portfolio commit"

# Push to GitHub (use 'main' or 'master' depending on Git version)
git branch -M main
git push -u origin main
```

### Method 2: Drag & Drop on GitHub

1. Go to your GitHub repository
2. Click **Add file** → **Upload files**
3. Drag and drop your portfolio files
4. Click **Commit changes**

### Method 3: GitHub Desktop (GUI)

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Sign in with your GitHub account
3. Click **File** → **Clone repository**
4. Enter your repository URL
5. Clone to your local machine
6. Copy your portfolio files into the cloned folder
7. Commit and push using the GUI

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **Deploy from branch**
4. Select branch: **main**
5. Select folder: **/ (root)**
6. Click **Save**

⏳ GitHub will build your site (usually takes 1-2 minutes)

## Step 5: Access Your Live Portfolio

Your site will be available at:

- **If using `username.github.io`:** `https://username.github.io`
- **If using another repo name:** `https://username.github.io/portfolio`

Check the **Settings** → **Pages** tab to see your live URL.

## Step 6: Update Your Portfolio (After Deployment)

To make changes:

```bash
# Make edits to your files locally

# Stage changes
git add .

# Commit with a message
git commit -m "Update portfolio content"

# Push to GitHub
git push
```

GitHub will automatically rebuild and deploy your changes (takes ~1-2 minutes).

## Optional: Use a Custom Domain

If you own a domain (like `sohail.dev`):

1. Go to **Settings** → **Pages**
2. Under **Custom domain**, enter your domain
3. Configure your domain's DNS settings with your registrar

### DNS Configuration (Example)

Add these DNS records in your domain provider:

```
A: 185.199.108.153
A: 185.199.109.153
A: 185.199.110.153
A: 185.199.111.153

CNAME: yourdomain.com -> username.github.io
```

---

# Netlify Deployment Guide

## Step 1: Prepare Your Repository

Push your portfolio to GitHub (follow the GitHub Pages steps above), or you can deploy directly from a Netlify Git integration.

## Step 2: Create a Netlify Account

1. Go to [netlify.com](https://netlify.com)
2. Click **Sign up**
3. Choose to sign up with **GitHub** (easiest), **GitLab**, **Bitbucket**, or email
4. Authorize Netlify to access your repositories

## Step 3: Deploy Your Site

### Option A: Connect Your Git Repository (Recommended)

1. Click **Add new site** → **Import an existing project**
2. Select your Git provider (GitHub, GitLab, or Bitbucket)
3. Choose your portfolio repository
4. Configure build settings:
   - **Build command:** (leave empty - no build needed)
   - **Publish directory:** `.` (root folder)
5. Click **Deploy site**

⏳ Netlify will deploy your site in seconds!

### Option B: Drag & Drop Deployment

1. Go to [netlify.com/drop](https://netlify.com/drop)
2. Drag your portfolio folder into the drop zone
3. Your site is live immediately!

## Step 4: Access Your Live Site

Your site will be available at a randomly generated URL like:

```
https://your-site-12345.netlify.app
```

## Step 5: Use a Custom Domain (Optional)

1. Go to your Netlify site dashboard
2. Click **Site settings** → **Domain management**
3. Click **Add custom domain**
4. Enter your domain (e.g., `sohail.dev`)
5. Follow Netlify's DNS configuration instructions:
   - Configure your domain registrar with Netlify's nameservers, OR
   - Point CNAME records to your Netlify site

## Step 6: Enable HTTPS

✅ **Automatic** - Netlify provides free SSL/TLS certificates via Let's Encrypt. Your site is secure by default!

## Deploy Updates to Netlify

### If Using Git Integration:

```bash
# Make changes locally
# Commit and push to GitHub

git add .
git commit -m "Update portfolio"
git push
```

Netlify automatically detects the push and redeploys your site!

### If Using Drag & Drop:

1. Go to your Netlify dashbboard
2. Click **Deploys** tab
3. Drag your updated folder to redeploy

## Netlify vs GitHub Pages Comparison

| Feature           | Netlify                | GitHub Pages         |
| ----------------- | ---------------------- | -------------------- |
| **Deploy Speed**  | Instant                | 1-2 minutes          |
| **Custom Domain** | Free, Easy             | Free, Easy           |
| **HTTPS**         | Free (Auto)            | Free (Auto)          |
| **Form Handling** | Built-in (paid)        | Not included         |
| **Analytics**     | Available              | Not included         |
| **Redirects**     | Built-in               | Requires workarounds |
| **Staging Sites** | Easy (Deploy Previews) | More complex         |

## Troubleshooting

### Site not appearing?

- Wait 30-60 seconds for deployment to complete
- Check **Deploys** tab for any build errors
- Verify all your files are in the repository

### Images or files not loading?

- Check file paths are relative (e.g., `assets/images/hero/photo.jpg`)
- Ensure no uppercase/lowercase mismatches in filenames
- Verify files were included in your deployment

### Custom domain not working?

- Check DNS configuration in your domain registrar
- Wait 24-48 hours for DNS propagation
- Use [DNS Checker](https://dnschecker.org/) to verify

## Best Practices for Netlify

✅ **Do:**

- Connect your GitHub repo for automatic deployments
- Use Deploy Previews to test before going live
- Enable Netlify Analytics to track visitors
- Set up status notifications for deployments

❌ **Don't:**

- Upload large files (keep under 50MB total for free plan)
- Commit node_modules or build artifacts
- Use absolute paths in links

## Managing Your Site on Netlify

1. **View Deployment Status:** Deploys tab → See real-time status
2. **Create Deploy Previews:** Opens automatically for Pull Requests
3. **Rollback Deployments:** Deploy History → Restore previous version
4. **Monitor Performance:** Analytics → See visitor stats
5. **Set Environment Variables:** Site settings → Build & deploy

## Netlify Free Plan Limits

- ✅ Unlimited sites and bandwidth
- ✅ Free custom domain support
- ✅ Free SSL/TLS certification
- ✅ Basic analytics
- ⚠️ Form submissions: 100/month (paid for more)
- ⚠️ Netlify Functions: 125,000 requests/month

For a static portfolio site, the free plan is perfect!

---

## Troubleshooting

### Site not appearing after 10 minutes?

- Check **Settings** → **Pages** to see build status
- Look for error messages in the Actions tab

### Files not showing correctly?

- Verify all file paths are relative (e.g., `css/style.css` not `/css/style.css`)
- Check that image paths are correct: `assets/images/...`

### Custom domain not working?

- Wait 24-48 hours for DNS propagation
- Verify DNS records are correctly configured
- Test with: `nslookup yourdomain.com`

## Best Practices

✅ **Do:**

- Keep files organized in folders
- Use relative paths for all links
- Test locally before pushing
- Write meaningful commit messages
- Update regularly with new projects

❌ **Don't:**

- Use absolute paths with `/`
- Upload large files (>100MB)
- Commit `.gitignore` files as tracked
- Push sensitive information (API keys, passwords)

## File Structure for GitHub Pages

```
.
├── index.html                  (Main file - must be in root)
├── css/
│   ├── style.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── main.js
│   ├── scroll.js
│   ├── form.js
│   └── theme.js
├── assets/
│   ├── images/
│   └── icons/
├── sitemap.xml                 (For SEO)
├── robots.txt                  (For SEO)
├── manifest.json               (For PWA)
├── README.md
└── .gitignore
```

## Next Steps

1. ✅ Deploy to GitHub Pages
2. 📧 Update your contact email in `index.html`
3. 🔗 Update your social links (GitHub, LinkedIn, Twitter)
4. 🎨 Customize colors and content
5. 📷 Replace placeholder images with your actual photos
6. 📱 Test on mobile devices

## Support & Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Git Documentation](https://git-scm.com/doc)
- [MDN Web Docs](https://developer.mozilla.org/)

## Performance Tips

- **Images**: Optimize before uploading (use [TinyPNG](https://tinypng.com/))
- **CSS**: Already minified in production
- **JS**: Already optimized and vanilla (no frameworks)
- **SEO**: Your sitemap.xml is ready for search engines

---

**Good luck with your portfolio deployment! 🚀**

Need help? Check the troubleshooting section or visit GitHub's help center.
