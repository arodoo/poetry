// File: BatchDeleteHandler.ts
// Purpose: HTTP handler for batch template deletion operations.
// Accepts array of slot IDs and deletes them from R503 device.
// All Rights Reserved. Arodi Emmanuel

import { Request, Response } from 'express';
import { FingerprintPort } from '../../../application/ports/FingerprintPort.js';
import { logger } from '../../../infrastructure/logging/logger.js';

export class BatchDeleteHandler {
    constructor(private fingerprintPort: FingerprintPort) { }

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { slotIds } = req.body as { slotIds: number[] };

            if (!Array.isArray(slotIds) || slotIds.length === 0) {
                res.status(400).json({
                    success: false,
                    error: 'Missing or empty slotIds array',
                });
                return;
            }

            const result = await this.fingerprintPort.deleteTemplates(slotIds);

            logger.info(`Batch delete completed: ${result.successfulSlots.length} ok`);

            res.status(200).json({
                success: result.failedSlots.length === 0,
                deletedCount: result.successfulSlots.length,
                failedSlots: result.failedSlots,
            });
        } catch (error) {
            logger.error('Batch delete error:', error);
            res.status(500).json({ success: false, error: 'Batch delete failed' });
        }
    }
}
