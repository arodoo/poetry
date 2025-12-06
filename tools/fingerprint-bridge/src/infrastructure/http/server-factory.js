// File: server-factory.js
// Purpose: Creates and configures Express server instance
// Applies middleware and registers routes
// All Rights Reserved. Arodi Emmanuel

import express from 'express';
import {
  deviceRoutes, captureRoutes, workflowRoutes, templateRoutes
} from './routes/index.js';

export function createServer() {
  const app = express();
  app.use(express.json());

  app.get('/health', (req, res) => {
    res.json({ status: 'ok', arch: process.arch });
  });

  app.use('/device', deviceRoutes);
  app.use('/capture', captureRoutes);
  app.use('/fingerprint', workflowRoutes);
  app.use('/fingerprint/template', templateRoutes);

  return app;
}

export function startServer(app, port = 3001) {
  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      console.log(`Bridge running on port ${port} (${process.arch})`);
      resolve(server);
    });
  });
}
