import express, { Express } from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';
const AuthRoutes = require('../src/routes/auth');
const { ConnectDB } = require('../src/config/db');

let app: Express | undefined;

async function getApp(): Promise<Express> {
  if (app) {
    return app;
  }

  app = express();
  app.use(express.json());
  app.use('/auth', AuthRoutes);

  // Connect to database
  await ConnectDB();

  return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const expressApp = await getApp();
  
  // Convert Vercel request/response to Express-compatible format
  return new Promise((resolve, reject) => {
    expressApp(req as any, res as any, (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(undefined);
      }
    });
  });
}

