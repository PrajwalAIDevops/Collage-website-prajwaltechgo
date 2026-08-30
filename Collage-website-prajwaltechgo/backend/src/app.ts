import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/error.middleware.js';
import { db } from './config/database.js';
import apiRoutes from './routes/index.js';

export function createApp(): Express {
  const app = express();

  // Enhanced CORS configuration for local development, docker multi-port setups, and cloud deployments
  app.use(
    cors({
      origin: true,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health Endpoint
  app.get('/api/health', async (req: Request, res: Response) => {
    const isDbConnected = await db.testDbConnection();
    if (isDbConnected) {
      return res.status(200).json({
        status: 'UP',
        database: 'CONNECTED',
        timestamp: new Date().toISOString(),
      });
    } else {
      return res.status(503).json({
        status: 'DOWN',
        database: 'DISCONNECTED',
        error: 'Database connection failed. MySQL is unavailable. Please verify MySQL server and environment variables.',
        timestamp: new Date().toISOString(),
      });
    }
  });

  // API Routes
  app.use('/api', apiRoutes);

  // Centralized Error Handler
  app.use(errorHandler);

  return app;
}

export default createApp;
