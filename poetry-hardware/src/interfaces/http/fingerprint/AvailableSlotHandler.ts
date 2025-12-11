// File: AvailableSlotHandler.ts
// Purpose: HTTP handler for finding the next available R503 slot.
// Returns the first free slot ID for template restoration.
// All Rights Reserved. Arodi Emmanuel

import { Request, Response } from 'express';
import { FingerprintPort } from '../../../application/ports/FingerprintPort.js';
import { logger } from '../../../infrastructure/logging/logger.js';

export class AvailableSlotHandler {
    constructor(private fingerprintPort: FingerprintPort) { }

    async handle(_req: Request, res: Response): Promise<void> {
        try {
            const slotId = await this.fingerprintPort.findAvailableSlot();
            logger.info(`Available slot found: ${slotId}`);
            res.status(200).json({ success: true, slotId });
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Unknown error';
            logger.error('Find available slot error:', error);
            res.status(503).json({ success: false, error: msg });
        }
    }
}
