// File: fingerprintRoutes.ts
// Purpose: API routes for fingerprint operations. Enrollment
// verification, template management for R503 sensor.
// All Rights Reserved. Arodi Emmanuel

import { Router } from 'express';
import { FingerprintController } from './FingerprintController.js';

export function createFingerprintRoutes(
  controller: FingerprintController
): Router {
  const router = Router();

  router.post('/enroll', controller.enroll);
  router.post('/verify', controller.verify);
  router.delete('/template/:slotId', controller.deleteTemplate);
  router.post('/templates/delete-batch', controller.deleteBatch);
  router.get('/template-count', controller.getTemplateCount);
  router.get('/available-slot', controller.getAvailableSlot);
  router.get('/template/:slotId', controller.downloadTemplate);
  router.post('/template', controller.uploadTemplate);

  return router;
}
