# How to Change Deployment Branch in Vercel

## Method 1: Change Production Branch (Vercel Dashboard)

### Step-by-Step:

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Login to your account

2. **Select Your Project**
   - Click on your project name

3. **Go to Settings**
   - Click on **Settings** in the top navigation bar

4. **Click on Git**
   - In the left sidebar, click **Git**

5. **Change Production Branch**
   - Find the **Production Branch** section
   - Click the dropdown or edit button
   - Select your desired branch (e.g., `vercel-deployment`, `main`, `master`, `develop`)
   - Click **Save**

6. **Redeploy**
   - Go to **Deployments**
   - Click the **3 dots** (⋮) on the latest deployment
   - Click **Redeploy** to deploy from the new branch

---

## Method 2: Deploy Specific Branch Using CLI

### Deploy from a specific branch:

```bash
# Navigate to your project
cd my_tenent_web/my_tenent_server

# Checkout the branch you want to deploy
git checkout your-branch-name

# Deploy to Vercel (will deploy from current branch)
vercel

# Or deploy to production from specific branch
vercel --prod
```

### Deploy a specific branch without switching:

```bash
# Deploy specific branch to preview
vercel --branch your-branch-name

# Deploy specific branch to production
vercel --prod --branch your-branch-name
```

---

## Method 3: Deploy from Specific Branch via Dashboard

### Deploy a branch as Preview:

1. Go to **Deployments** tab
2. Click **Create Deployment** button
3. Select **Branch** from dropdown
4. Choose your branch name
5. Click **Deploy**

### Promote Preview to Production:

1. Go to **Deployments** tab
2. Find the preview deployment you want
3. Click the **3 dots** (⋮)
4. Click **Promote to Production**

---

## Method 4: Configure Automatic Branch Deployments

### Set up automatic deployments for multiple branches:

1. Go to **Settings** → **Git**
2. Under **Production Branch**, select your main branch
3. All other branches will automatically create **Preview Deployments**
4. You can promote any preview to production

---

## Method 5: Create a New Branch and Deploy

### Create and deploy a new branch:

```bash
# Navigate to your project
cd my_tenent_web/my_tenent_server

# Create a new branch
git checkout -b vercel-deployment

# Add your changes
git add .

# Commit your changes
git commit -m "Add Vercel deployment configuration"

# Push the branch
git push origin vercel-deployment

# Deploy to Vercel
vercel --prod --branch vercel-deployment
```

---

## Method 6: Using Vercel Dashboard - Deploy from Branch

### Steps:

1. **Go to Deployments**
   - Click **Deployments** in your project

2. **Create New Deployment**
   - Click **Create Deployment** button (top right)

3. **Select Branch**
   - In the modal, select **Branch** option
   - Choose your branch from the dropdown
   - Select **Production** or **Preview**
   - Click **Deploy**

---

## Common Branch Deployment Scenarios

### Scenario 1: Deploy from `vercel-deployment` branch

```bash
# Switch to your branch
git checkout vercel-deployment

# Deploy to production
vercel --prod
```

### Scenario 2: Deploy from `main` branch (default)

```bash
# Switch to main
git checkout main

# Deploy
vercel --prod
```

### Scenario 3: Deploy from `develop` branch as preview

```bash
# Switch to develop
git checkout develop

# Deploy as preview (not production)
vercel
```

---

## Understanding Vercel Branch Deployments

### Production Branch:
- **One branch** is set as the production branch
- Deployments from this branch go to your main URL: `https://your-project.vercel.app`
- Set in: **Settings** → **Git** → **Production Branch**

### Preview Branches:
- **All other branches** create preview deployments
- Each branch gets a unique URL: `https://your-project-git-branch-name.vercel.app`
- Automatic preview deployments can be enabled/disabled

### Branch Protection:
- You can set branch protection rules
- Prevents accidental production deployments
- Configure in: **Settings** → **Git** → **Branch Protection**

---

## Quick Commands Reference

```bash
# Deploy current branch to preview
vercel

# Deploy current branch to production
vercel --prod

# Deploy specific branch to preview
vercel --branch branch-name

# Deploy specific branch to production
vercel --prod --branch branch-name

# List all deployments
vercel ls

# Remove a deployment
vercel rm [deployment-url]
```

---

## Troubleshooting

### Branch not showing in Vercel?
1. Make sure you've pushed the branch to GitHub/GitLab/Bitbucket
2. Verify the branch exists in your repository
3. Check Git integration in Vercel Settings

### Can't change production branch?
1. Check if you have admin/owner permissions
2. Verify Git integration is connected
3. Try disconnecting and reconnecting Git

### Deployment fails from branch?
1. Check branch has all required files
2. Verify environment variables are set for that branch
3. Check Vercel logs for specific errors

---

## Best Practices

1. **Use feature branches** for development
2. **Set `main` or `master`** as production branch
3. **Test in preview** before promoting to production
4. **Use branch protection** for production branch
5. **Keep environment variables** synced across branches

---

## Visual Guide

```
Vercel Dashboard
└── Your Project
    └── Settings
        └── Git
            ├── Production Branch: [main ▼]
            │   └── Select branch dropdown
            │
            ├── Automatic Deployments
            │   ├── ☑ Production Branch
            │   └── ☑ Preview Branches
            │
            └── Branch Protection
                └── ☐ Protect Production Branch
```

---

## Example Workflow

```bash
# 1. Create a new branch for Vercel deployment
git checkout -b vercel-deployment

# 2. Make your changes (already done)
# - Added vercel.json
# - Added api/index.ts
# - Updated package.json

# 3. Commit changes
git add .
git commit -m "Add Vercel deployment configuration"

# 4. Push branch
git push origin vercel-deployment

# 5. Deploy to Vercel (preview first)
vercel --branch vercel-deployment

# 6. Test the preview deployment
# Visit: https://your-project-git-vercel-deployment.vercel.app

# 7. If everything works, promote to production
# Via Dashboard: Deployments → Promote to Production
# Or via CLI: vercel --prod --branch vercel-deployment
```

