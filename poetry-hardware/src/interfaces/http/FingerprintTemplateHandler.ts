// File: FingerprintTemplateHandler.ts
// Purpose: Handles HTTP requests for fingerprint template
// management operations like delete and count.
// All Rights Reserved. Arodi Emmanuel

import { Request, Response } from 'express';
import { FingerprintPort } from '../../application/ports/FingerprintPort.js';
import { logger } from '../../infrastructure/logging/logger.js';

export class FingerprintTemplateHandler {
  constructor(private fingerprintPort: FingerprintPort) {}

  async deleteTemplate(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { slotId } = req.params;
      const id = parseInt(slotId, 10);

      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          error: 'Invalid slotId',
        });
        return;
      }

      const success = await this.fingerprintPort.deleteTemplate(id);

      res.status(200).json({ success });
    } catch (error) {
      logger.error('Delete template error:', error);
      res.status(500).json({
        success: false,
        error: 'Delete failed',
      });
    }
  }

  async getTemplateCount(
    _req: Request,
    res: Response
  ): Promise<void> {
    try {
      const count = await this.fingerprintPort.getTemplateCount();

      res.status(200).json({ count });
    } catch (error) {
      logger.error('Get template count error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get count',
      });
    }
  }
}
