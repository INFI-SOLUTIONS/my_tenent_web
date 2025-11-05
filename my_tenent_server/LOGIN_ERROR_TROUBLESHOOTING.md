# Login Error Troubleshooting Guide

## Common Login Errors and Fixes

### 1. "Server error. Please try again later." (500 Error)

**Possible Causes:**
- Database connection failed
- JWT_SECRET not set
- MongoDB connection string incorrect
- Network issues

**How to Fix:**
1. Check Vercel logs for specific error messages
2. Verify `MONGO_URI` is set in Vercel environment variables
3. Verify `JWT_SECRET` is set in Vercel environment variables
4. Check MongoDB Atlas network access (allow 0.0.0.0/0)
5. Test database connection locally first

### 2. "Email and password are required" (400 Error)

**Cause:** Missing email or password in request body

**How to Fix:**
- Make sure your request includes both `email` and `password` fields:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### 3. "Email not found. Please register first." (404 Error)

**Cause:** User doesn't exist in database

**How to Fix:**
- First register the user using `/auth/signup` endpoint
- Check if email is spelled correctly
- Verify user exists in MongoDB database

### 4. "Incorrect password." (400 Error)

**Cause:** Password doesn't match

**How to Fix:**
- Verify you're using the correct password
- Check for typos
- Make sure password wasn't changed
- Try resetting password if needed

### 5. "Server configuration error. Please contact administrator." (500 Error)

**Cause:** JWT_SECRET environment variable is not set

**How to Fix:**
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add `JWT_SECRET` with a strong random string
3. Redeploy your project

### 6. "Database error. Please try again later." (500 Error)

**Cause:** MongoDB connection issue

**How to Fix:**
1. Check `MONGO_URI` is set correctly
2. Verify MongoDB Atlas network access allows all IPs (0.0.0.0/0)
3. Check MongoDB cluster is running (not paused)
4. Verify database user credentials are correct

---

## Testing Login Endpoint

### Using cURL:
```bash
curl -X POST https://your-project.vercel.app/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Expected Success Response (200):
```json
{
  "message": "Login successful!",
  "user": {
    "id": "user_id_here",
    "email": "test@example.com",
    "name": "Test User",
    "role": "user"
  },
  "token": "jwt_token_here"
}
```

### Expected Error Responses:

**400 - Missing Fields:**
```json
{
  "message": "Email and password are required"
}
```

**404 - User Not Found:**
```json
{
  "message": "Email not found. Please register first."
}
```

**400 - Wrong Password:**
```json
{
  "message": "Incorrect password."
}
```

**500 - Server Error:**
```json
{
  "message": "Server error. Please try again later.",
  "error": "Detailed error (only in development)"
}
```

---

## Debugging Steps

### Step 1: Check Vercel Logs
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on the deployment
3. Go to **Functions** tab
4. Click on your function
5. Check **Logs** tab for error messages

Look for:
- `JWT_SECRET is not set in environment variables`
- `Database connection error`
- `MongoError`
- `ValidationError`

### Step 2: Verify Environment Variables
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Verify these are set:
   - ✅ `MONGO_URI`
   - ✅ `JWT_SECRET`
   - ✅ `EMAIL_USER` (optional, for email features)
   - ✅ `EMAIL_PASS` (optional, for email features)

### Step 3: Test Database Connection
1. Test locally with your `.env` file
2. Make sure MongoDB connection works
3. Verify user exists in database

### Step 4: Test Health Endpoint
```bash
curl https://your-project.vercel.app/
```

Should return:
```json
{
  "status": "ok",
  "message": "API is running",
  "dbConnected": true
}
```

If `dbConnected: false`, database connection is failing.

### Step 5: Check User in Database
1. Connect to MongoDB Atlas
2. Check your database
3. Verify user exists in the `users` collection
4. Check password field is hashed (not plain text)

---

## Common Issues Fixed

### Issue: Login always returns 500 error
**Fixed:** Added better error handling and validation
- Now checks if JWT_SECRET is set
- Validates request body
- Provides specific error messages
- Better database error handling

### Issue: "JWT_SECRET is not set" error
**Fixed:** Added check before using JWT_SECRET
- Returns clear error message if missing
- Prevents silent failures

### Issue: Database connection timeout
**Fixed:** Improved database connection handling
- Better error logging
- Non-blocking connection (app starts even if DB fails initially)

---

## Quick Checklist

Before testing login, verify:
- [ ] User exists in database (use `/auth/signup` first)
- [ ] `MONGO_URI` is set in Vercel
- [ ] `JWT_SECRET` is set in Vercel
- [ ] MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- [ ] Request includes `email` and `password` fields
- [ ] Request Content-Type is `application/json`
- [ ] Project has been redeployed after adding environment variables

---

## Still Having Issues?

1. **Check Vercel Function Logs** - Most detailed error information
2. **Test locally first** - Make sure login works with local `.env`
3. **Verify user exists** - Check MongoDB directly
4. **Test with Postman** - Use proper JSON format
5. **Check network** - Ensure MongoDB Atlas is accessible

---

## Example Test Flow

```bash
# 1. Register a user first
curl -X POST https://your-project.vercel.app/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "user"
  }'

# 2. Then login with the same credentials
curl -X POST https://your-project.vercel.app/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

