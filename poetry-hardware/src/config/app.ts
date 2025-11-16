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

  app.use(
    cors({
      origin: process.env.ALLOWED_ORIGINS || '*',
    })
  );
  app.use(express.json());

  app.use((req, _res, next) => {
    logger.info(`${req.method} ${req.path}`);
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

  return app;
}
