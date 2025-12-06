// File: FingerprintEnrollmentHandler.ts
// Purpose: Handles HTTP fingerprint enrollment requests and
// coordinates with hardware service.
// All Rights Reserved. Arodi Emmanuel

import { Request, Response } from 'express';
import { FingerprintPort } from '../../../application/ports/FingerprintPort.js';
import { logger } from '../../../infrastructure/logging/logger.js';

export class FingerprintEnrollmentHandler {
  constructor(private fingerprintPort: FingerprintPort) { }

  async enroll(req: Request, res: Response): Promise<void> {
    try {
      const { slotId } = req.body;

      if (!slotId || typeof slotId !== 'number') {
        res.status(400).json({
          success: false,
          error: 'Invalid slotId',
        });
        return;
      }

      logger.info(`Starting enrollment for slot ${slotId}`);

      const result = await this.fingerprintPort.enroll(slotId);

      if (result.success) {
        logger.info(`Enrollment completed for slot ${slotId}`);
        res.status(200).json({
          success: true,
          slotId: result.templateId,
          message: 'Fingerprint enrolled successfully',
        });
      } else {
        logger.error(`Enrollment failed for slot ${slotId}`);
        res.status(500).json({
          success: false,
          error: 'Enrollment failed',
        });
      }
    } catch (error) {
      logger.error('Enrollment error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error',
      });
    }
  }

  async verify(_req: Request, res: Response): Promise<void> {
    try {
      logger.info('Starting fingerprint verification');

      const result = await this.fingerprintPort.verify();

      res.status(200).json({
        matched: result.matched,
        slotId: result.templateId,
        confidence: result.confidence,
      });
    } catch (error) {
      logger.error('Verification error:', error);
      res.status(500).json({
        success: false,
        error: 'Verification failed',
      });
    }
  }
}
