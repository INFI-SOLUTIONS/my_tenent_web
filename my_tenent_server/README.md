# my_tenent_server — TypeScript setup

This project has been configured to use TypeScript.

Quick commands (PowerShell / Windows):

```powershell
# install dev deps
npm install --save-dev typescript ts-node @types/node @types/express

# run in development (nodemon + ts-node)
npm run dev

# build to JS (dist/) and run
npm run build
npm start
```

Notes:
- Development uses `nodemon` with `nodemon.json` which executes `ts-node ./src/server.ts`.
- Compiled output is written to `dist/` by `tsc`.
