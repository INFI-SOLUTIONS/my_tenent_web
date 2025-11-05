import express, { Express } from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';
const AuthRoutes = require('../src/routes/auth');
const { ConnectDB } = require('../src/config/db');

let app: Express | undefined;
let dbConnectionAttempted = false;

async function getApp(): Promise<Express> {
  if (app) {
    return app;
  }

  app = express();
  app.use(express.json());
  
  // Health check endpoint
  app.get('/', (req, res) => {
    res.json({ 
      status: 'ok', 
      message: 'API is running',
      dbConnected: dbConnectionAttempted
    });
  });
  
  app.use('/auth', AuthRoutes);

  // Connect to database (non-blocking, but log status)
  if (!dbConnectionAttempted) {
    dbConnectionAttempted = true;
    ConnectDB()
      .then(() => {
        console.log('Database connection successful');
      })
      .catch((error: any) => {
        console.error('Database connection error:', error);
        // Don't throw - allow app to start even if DB fails initially
        // But routes will fail when trying to use DB
      });
  }

  return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const expressApp = await getApp();
    
    // Convert Vercel request/response to Express-compatible format
    return new Promise((resolve, reject) => {
      expressApp(req as any, res as any, (err: any) => {
        if (err) {
          console.error('Express handler error:', err);
          reject(err);
        } else {
          resolve(undefined);
        }
      });
    });
  } catch (error: any) {
    console.error('Handler error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error?.message || 'Unknown error',
      details: process.env.NODE_ENV === 'development' ? error?.stack : undefined
    });
  }
}

