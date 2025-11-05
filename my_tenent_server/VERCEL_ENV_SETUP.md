# How to Set Environment Variables in Vercel

## Method 1: Using Vercel Dashboard (Recommended)

### Step-by-Step:

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Login to your account

2. **Select Your Project**
   - Click on your project name (e.g., `my_tenent_server`)

3. **Go to Settings**
   - Click on **Settings** in the top navigation bar

4. **Click on Environment Variables**
   - In the left sidebar, click **Environment Variables**

5. **Add Each Variable**

   For each variable in your `.env` file:

   **Example variables (based on your code):**
   - `MONGO_URI`
   - `JWT_SECRET`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `BASE_URL` (optional)

   **To add each one:**
   - Click **Add New** button
   - Enter the **Key** (variable name) - e.g., `MONGO_URI`
   - Enter the **Value** (your actual value) - e.g., `mongodb+srv://...`
   - Select **Environment** (Production, Preview, Development)
     - ✅ Check **Production** (for live deployments)
     - ✅ Check **Preview** (for preview deployments)
     - ✅ Check **Development** (for local development)
   - Click **Save**

6. **Repeat for all variables**

   Add all variables from your `.env` file one by one.

7. **Redeploy**
   - After adding all variables, go to **Deployments**
   - Click the **3 dots** (⋮) on the latest deployment
   - Click **Redeploy** to apply the new environment variables

---

## Method 2: Using Vercel CLI

### Install Vercel CLI (if not installed):
```bash
npm i -g vercel
```

### Set Environment Variables:

```bash
# Navigate to your project directory
cd my_tenent_web/my_tenent_server

# Set each variable
vercel env add MONGO_URI
# When prompted, paste your MongoDB URI and select environments (Production, Preview, Development)

vercel env add JWT_SECRET
# When prompted, paste your JWT secret

vercel env add EMAIL_USER
# When prompted, paste your email

vercel env add EMAIL_PASS
# When prompted, paste your email password

vercel env add BASE_URL
# When prompted, paste your base URL (optional)
```

### Verify Environment Variables:
```bash
vercel env ls
```

This will show all your environment variables.

---

## Method 3: Using Vercel Dashboard (Bulk Import)

1. Go to **Settings** → **Environment Variables**
2. Click **Import** button (if available)
3. Paste your `.env` file contents
4. Vercel will parse and create variables automatically

---

## Your Environment Variables (Based on Code)

Based on your code, you need these variables:

### Required Variables:

1. **MONGO_URI**
   - Your MongoDB connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
   - Example: `mongodb+srv://myuser:mypass@cluster0.xxxxx.mongodb.net/my_tenent_db?retryWrites=true&w=majority`

2. **JWT_SECRET**
   - Secret key for JWT token signing
   - Should be a long, random string
   - Example: `your-super-secret-jwt-key-here-make-it-long-and-random`

3. **EMAIL_USER**
   - Your Gmail address for sending emails
   - Example: `your-email@gmail.com`

4. **EMAIL_PASS**
   - Your Gmail App Password (not your regular password)
   - How to get: https://support.google.com/accounts/answer/185833
   - Example: `abcd efgh ijkl mnop`

### Optional Variables:

5. **BASE_URL**
   - Your deployed API URL (Vercel auto-sets `VERCEL_URL`, but you can override)
   - Example: `https://your-project.vercel.app`

---

## Visual Guide (Vercel Dashboard)

```
Vercel Dashboard
└── Your Project
    └── Settings
        └── Environment Variables
            ├── Add New
            │   ├── Key: MONGO_URI
            │   ├── Value: mongodb+srv://...
            │   └── Environment: ☑ Production ☑ Preview ☑ Development
            │
            ├── Add New
            │   ├── Key: JWT_SECRET
            │   ├── Value: your-secret-key
            │   └── Environment: ☑ Production ☑ Preview ☑ Development
            │
            ├── Add New
            │   ├── Key: EMAIL_USER
            │   ├── Value: your-email@gmail.com
            │   └── Environment: ☑ Production ☑ Preview ☑ Development
            │
            └── Add New
                ├── Key: EMAIL_PASS
                ├── Value: your-app-password
                └── Environment: ☑ Production ☑ Preview ☑ Development
```

---

## Important Notes:

1. **Never commit `.env` file to Git**
   - Your `.env` file should be in `.gitignore`
   - Vercel environment variables are separate from your local `.env`

2. **Environment Selection**
   - **Production**: Used for production deployments (your main URL)
   - **Preview**: Used for preview deployments (pull requests, branches)
   - **Development**: Used for local development (when using `vercel dev`)

3. **Redeploy After Adding Variables**
   - Environment variables are only available after redeployment
   - Go to **Deployments** → Click **⋮** → **Redeploy**

4. **Security**
   - Never share your environment variable values
   - Keep them secret and secure
   - Use different values for production and development

5. **Variable Names**
   - Must match exactly what's in your code
   - Case-sensitive: `MONGO_URI` ≠ `mongo_uri`

---

## Quick Checklist:

- [ ] `MONGO_URI` is set
- [ ] `JWT_SECRET` is set
- [ ] `EMAIL_USER` is set
- [ ] `EMAIL_PASS` is set
- [ ] All variables are set for Production, Preview, and Development
- [ ] Project has been redeployed after adding variables

---

## Troubleshooting:

### Variables not working?
1. Check variable names match exactly (case-sensitive)
2. Make sure you selected the correct environment (Production/Preview/Development)
3. Redeploy your project after adding variables
4. Check Vercel logs for errors

### Where to find your values?
- **MONGO_URI**: MongoDB Atlas → Connect → Copy connection string
- **JWT_SECRET**: Generate a random string (use `openssl rand -base64 32` or online generator)
- **EMAIL_USER**: Your Gmail address
- **EMAIL_PASS**: Gmail App Password (Settings → Security → App passwords)

---

## After Setting Variables:

1. **Redeploy** your project
2. **Test** the health endpoint: `https://your-project.vercel.app/`
3. **Check logs** if there are still errors

