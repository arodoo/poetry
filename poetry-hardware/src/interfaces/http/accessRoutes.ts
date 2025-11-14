// File: accessRoutes.ts
// Purpose: Define HTTP routes for access control endpoints
// All Rights Reserved.

import { Router } from 'express';
import { AccessController } from './AccessController.js';

export const createAccessRoutes = (
  controller: AccessController
): Router => {
  const router = Router();

  router.post('/verify-and-unlock', controller.verifyAndUnlock);

  return router;
};
