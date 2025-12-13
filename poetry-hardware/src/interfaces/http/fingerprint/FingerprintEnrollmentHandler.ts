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

      logger.info(`[FP] Enroll request received. Body: ${JSON.stringify(req.body)}`);
      logger.info(`[FP] slotId value: ${slotId}, type: ${typeof slotId}`);

      if (slotId === undefined || slotId === null || typeof slotId !== 'number') {
        logger.error(`[FP] Invalid slotId. Value: ${slotId}, Type: ${typeof slotId}`);
        res.status(400).json({
          success: false,
          error: `Invalid slotId. Received: ${slotId} (type: ${typeof slotId})`,
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

        // Provide specific error message based on common R503 error codes
        let errorMessage = 'Enrollment failed';
        if (result.templateId === 32) {
          errorMessage = 'Timeout: No finger detected on sensor. Please place your finger and try again.';
        } else if (result.templateId === 1) {
          errorMessage = 'Communication error with sensor';
        } else if (result.templateId === 6) {
          errorMessage = 'Failed to generate character file';
        } else if (result.templateId === 7) {
          errorMessage = 'Failed to generate template';
        }

        res.status(500).json({
          success: false,
          error: errorMessage,
          code: result.templateId,
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
