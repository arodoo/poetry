// File: app.ts
// Purpose: Express application setup
// All Rights Reserved. Arodi Emmanuel

import express from 'express';
import cors from 'cors';
import { createRelayRoutes } from '../interfaces/http/relayRoutes.js';
import { createAccessRoutes } from '../interfaces/http/accessRoutes.js';
import { createFingerprintRoutes } from '../interfaces/http/fingerprintRoutes.js';
import { RelayController } from '../interfaces/http/RelayController.js';
import { AccessController } from '../interfaces/http/AccessController.js';
import { FingerprintController } from '../interfaces/http/FingerprintController.js';
import { logger } from '../infrastructure/logging/logger.js';

export function createApp(
  relayController: RelayController,
  accessController: AccessController,
  fingerprintController: FingerprintController
): express.Application {
  const app = express();

  const allowedOrigins = [
    'http://localhost:5173', // Vite dev server
    'http://localhost:8080', // Backend proxy
    'http://localhost:3000', // Alternative frontend port
  ];

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
  app.use(express.json());

  app.use((req, _res, next) => {
    logger.info(`${req.method} ${req.path} - Origin: ${req.headers.origin || 'none'}`);
    next();
  });

  app.get('/health', (_req, res) => {
    res.status(200).json({
      status: 'ok',
      mode: process.env.MOCK_MODE === 'true' ? 'mock' : 'real',
    });
  });

  app.use('/api/relay', createRelayRoutes(relayController));
  app.use('/api/access', createAccessRoutes(accessController));
  app.use('/api/fingerprint', createFingerprintRoutes(fingerprintController));

  // Error handling middleware
  app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    logger.error(`Error: ${err.message}`, {
      method: req.method,
      path: req.path,
      origin: req.headers.origin,
      error: err.stack,
    });

    if (err.message === 'Not allowed by CORS') {
      res.status(403).json({
        error: 'CORS Error',
        message: 'Origin not allowed',
        origin: req.headers.origin,
      });
    } else {
      res.status(500).json({ error: err.message });
    }
  });

  return app;
}
