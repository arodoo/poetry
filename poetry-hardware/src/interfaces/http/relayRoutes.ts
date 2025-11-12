// File: relayRoutes.ts
// Purpose: Express routes for relay endpoints
// All Rights Reserved. Arodi Emmanuel

import { Router } from 'express';
import { RelayController } from './RelayController.js';

export function createRelayRoutes(
  controller: RelayController
): Router {
  const router = Router();

  router.post('/channel/:id/on', controller.activateChannel);
  router.post('/channel/:id/off', controller.deactivateChannel);
  router.get('/status', controller.getStatus);

  return router;
}
