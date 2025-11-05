# my_tenent_server — TypeScript setup

This project has been configured to use TypeScript.

## Quick commands (PowerShell / Windows):

```powershell
# install dev deps
npm install --save-dev typescript ts-node @types/node @types/express

# run in development (nodemon + ts-node)
npm run dev

# build to JS (dist/) and run
npm run build
npm start
```

## Deploying to Vercel

### Prerequisites:
1. Install Vercel CLI: `npm i -g vercel`
2. Create a Vercel account at [vercel.com](https://vercel.com)

### Deployment Steps:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables in Vercel:**
   - Go to your Vercel project settings
   - Add the following environment variables:
     - `MONGO_URI` - Your MongoDB connection string
     - `JWT_SECRET` - Secret key for JWT tokens
     - `EMAIL_USER` - Your Gmail address for sending emails
     - `EMAIL_PASS` - Your Gmail app password
     - `BASE_URL` (optional) - Your deployed API URL (Vercel will auto-set `VERCEL_URL`)

3. **Deploy using Vercel CLI:**
   ```bash
   cd my_tenent_server
   vercel
   ```
   
   Or deploy from the Vercel dashboard by connecting your Git repository.

4. **After deployment:**
   - Your API will be available at: `https://your-project.vercel.app`
   - Auth endpoints will be at: `https://your-project.vercel.app/auth/signup`, `/auth/signin`, etc.

### Project Structure:
- `api/index.ts` - Vercel serverless function handler
- `src/` - Source code (TypeScript)
- `vercel.json` - Vercel configuration
- `.vercelignore` - Files to ignore during deployment

### Notes:
- Development uses `nodemon` with `nodemon.json` which executes `ts-node ./src/server.ts`.
- Compiled output is written to `dist/` by `tsc`.
- The Vercel deployment uses the serverless function in `api/index.ts` which wraps your Express app.
