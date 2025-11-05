# API Testing Guide

After deploying to Vercel, use this guide to test your API endpoints.

## Getting Your Deployed URL

After deployment, Vercel will provide you with a URL like:
```
https://your-project-name.vercel.app
```

You can find this in:
- Vercel Dashboard → Your Project → Deployments
- Or after running `vercel` command, it will show the URL

## Available Endpoints

All endpoints are prefixed with `/auth`:

1. **POST** `/auth/signup` - Register a new user
2. **POST** `/auth/signin` - Login user
3. **POST** `/auth/forgot-password` - Request password reset
4. **POST** `/auth/reset-password/:token` - Reset password with token

---

## Testing Methods

### Method 1: Using cURL (Command Line)

#### 1. Test Sign Up
```bash
curl -X POST https://your-project-name.vercel.app/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }'
```

#### 2. Test Sign In
```bash
curl -X POST https://your-project-name.vercel.app/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### 3. Test Forgot Password
```bash
curl -X POST https://your-project-name.vercel.app/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

#### 4. Test Reset Password
```bash
curl -X POST https://your-project-name.vercel.app/auth/reset-password/YOUR_TOKEN_HERE \
  -H "Content-Type: application/json" \
  -d '{
    "newPassword": "newpassword123"
  }'
```

---

### Method 2: Using Postman

1. **Create a new request** for each endpoint
2. **Set method** to `POST`
3. **Enter URL**: `https://your-project-name.vercel.app/auth/[endpoint]`
4. **Go to Headers tab** and add:
   - Key: `Content-Type`
   - Value: `application/json`
5. **Go to Body tab** → Select `raw` → Choose `JSON`
6. **Enter JSON body** (see examples below)

#### Request Examples for Postman:

**Sign Up:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Sign In:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Forgot Password:**
```json
{
  "email": "john@example.com"
}
```

**Reset Password:**
```json
{
  "newPassword": "newpassword123"
}
```

---

### Method 3: Using JavaScript/Fetch (Browser Console)

Open browser console (F12) and run:

```javascript
// Test Sign Up
fetch('https://your-project-name.vercel.app/auth/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    fullName: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user'
  })
})
.then(res => res.json())
.then(data => console.log('Success:', data))
.catch(error => console.error('Error:', error));

// Test Sign In
fetch('https://your-project-name.vercel.app/auth/signin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123'
  })
})
.then(res => res.json())
.then(data => console.log('Success:', data))
.catch(error => console.error('Error:', error));
```

---

### Method 4: Using PowerShell (Windows)

```powershell
# Test Sign Up
Invoke-RestMethod -Uri "https://your-project-name.vercel.app/auth/signup" `
  -Method Post `
  -ContentType "application/json" `
  -Body '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }'

# Test Sign In
Invoke-RestMethod -Uri "https://your-project-name.vercel.app/auth/signin" `
  -Method Post `
  -ContentType "application/json" `
  -Body '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

---

## Expected Responses

### Successful Sign Up (201)
```json
{
  "message": "Registration successful",
  "user": {
    "id": "user_id_here",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Successful Sign In (200)
```json
{
  "message": "Login successful!",
  "user": {
    "id": "user_id_here",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "user"
  },
  "token": "jwt_token_here"
}
```

### Successful Forgot Password (200)
```json
{
  "message": "Reset Link sent your email please verify!"
}
```

### Successful Reset Password (200)
```json
{
  "message": "Password has been reset successfully"
}
```

### Error Responses (400/404/500)
```json
{
  "message": "Error message here"
}
```

---

## Quick Test Checklist

- [ ] Test sign up with valid data
- [ ] Test sign up with duplicate email (should fail)
- [ ] Test sign in with correct credentials
- [ ] Test sign in with wrong credentials (should fail)
- [ ] Test forgot password with registered email
- [ ] Test forgot password with non-registered email (should fail)
- [ ] Test reset password with valid token
- [ ] Test reset password with invalid/expired token (should fail)

---

## Troubleshooting

### If you get CORS errors:
Vercel handles CORS automatically, but if you need to add custom CORS headers, you can add middleware to your Express app in `api/index.ts`.

### If you get connection errors:
1. Check that your Vercel deployment was successful
2. Verify your environment variables are set in Vercel dashboard
3. Check Vercel function logs for errors

### If database connection fails:
1. Verify `MONGO_URI` is set correctly in Vercel environment variables
2. Check that your MongoDB cluster allows connections from Vercel IPs
3. Check Vercel function logs for connection errors

---

## Testing with REST Client Extension (VS Code)

If you use VS Code, install the "REST Client" extension and create a `test.http` file:

```http
### Sign Up
POST https://your-project-name.vercel.app/auth/signup
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}

### Sign In
POST https://your-project-name.vercel.app/auth/signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

