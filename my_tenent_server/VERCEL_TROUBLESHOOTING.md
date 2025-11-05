# Vercel Deployment Troubleshooting

## Error: 502 BAD_GATEWAY - DNS_HOSTNAME_NOT_FOUND

This error typically means your Vercel function cannot connect to MongoDB because:

### Common Causes:

1. **Missing Environment Variables** - `MONGO_URI` is not set in Vercel
2. **Incorrect MongoDB Connection String** - The URI format is wrong
3. **MongoDB Network Access** - Your MongoDB cluster doesn't allow connections from Vercel
4. **Invalid DNS/Hostname** - The MongoDB hostname in your connection string can't be resolved

---

## How to Fix:

### Step 1: Check Environment Variables in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Verify these variables are set:
   - `MONGO_URI` - Your MongoDB connection string
   - `JWT_SECRET` - Secret for JWT tokens
   - `EMAIL_USER` - Gmail address
   - `EMAIL_PASS` - Gmail app password

### Step 2: Verify MongoDB Connection String Format

Your `MONGO_URI` should look like one of these:

**MongoDB Atlas (Cloud):**
```
mongodb+srv://username:password@cluster-name.mongodb.net/database-name?retryWrites=true&w=majority
```

**MongoDB Local/Compass:**
```
mongodb://username:password@host:port/database-name
```

**Important Notes:**
- Replace `username` and `password` with your actual credentials
- Replace `cluster-name` with your actual cluster name
- Replace `database-name` with your database name
- Make sure there are **no spaces** in the connection string
- If your password has special characters, URL-encode them (e.g., `@` becomes `%40`)

### Step 3: Configure MongoDB Network Access (MongoDB Atlas)

If using MongoDB Atlas, you need to allow connections from anywhere (or Vercel's IPs):

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click **Network Access** in the left sidebar
3. Click **Add IP Address**
4. Click **Allow Access from Anywhere** (or add specific IPs)
5. Click **Confirm**

**Note:** For development, "Allow Access from Anywhere" (`0.0.0.0/0`) is fine. For production, consider restricting to known IPs.

### Step 4: Check Vercel Function Logs

1. Go to Vercel Dashboard → Your Project
2. Click on the failed deployment
3. Click **Functions** tab
4. Click on your function
5. Check the **Logs** tab for detailed error messages

Look for errors like:
- `MONGO_URI environment variable is not set`
- `MongoNetworkError: failed to connect`
- `DNS lookup failed`

### Step 5: Test the Connection String Locally

Before deploying, test your connection string locally:

1. Create a `.env` file in `my_tenent_server`:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
JWT_SECRET=your-secret-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

2. Run locally:
```bash
npm run dev
```

3. Test if it connects successfully

### Step 6: Verify MongoDB User Credentials

1. In MongoDB Atlas, go to **Database Access**
2. Verify your database user exists and has the correct password
3. Make sure the user has read/write permissions

### Step 7: Check MongoDB Cluster Status

1. In MongoDB Atlas, check your cluster status
2. Make sure it's not paused or stopped
3. Verify the cluster is in a healthy state

---

## Quick Fix Checklist:

- [ ] `MONGO_URI` is set in Vercel environment variables
- [ ] MongoDB connection string format is correct
- [ ] MongoDB Atlas Network Access allows connections from anywhere (0.0.0.0/0)
- [ ] MongoDB database user exists and password is correct
- [ ] MongoDB cluster is running and not paused
- [ ] Connection string has no spaces or formatting issues
- [ ] Special characters in password are URL-encoded

---

## Testing After Fix:

1. **Redeploy** your project on Vercel
2. **Check the health endpoint**: `https://your-project.vercel.app/`
   - Should return: `{"status":"ok","message":"API is running","dbConnected":true}`

3. **Test an endpoint**:
```bash
curl https://your-project.vercel.app/auth/signup \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test","email":"test@test.com","password":"test123","role":"user"}'
```

---

## Alternative: Using MongoDB Connection Options

If you're still having issues, try adding connection options to your MongoDB URI:

```
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority&ssl=true&tlsAllowInvalidCertificates=false
```

Or update `db.ts` to include connection options:

```typescript
await mongoose.connect(Mongo_URI, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
})
```

---

## Still Having Issues?

1. **Check Vercel Logs** - Look for specific error messages
2. **Test MongoDB Connection** - Use MongoDB Compass or `mongosh` to test the connection string
3. **Verify Environment Variables** - Make sure they're set for the correct environment (Production/Preview/Development)
4. **Check MongoDB Atlas Logs** - See if connection attempts are being blocked



