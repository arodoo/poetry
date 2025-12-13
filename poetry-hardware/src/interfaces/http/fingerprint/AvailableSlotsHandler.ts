// File: AvailableSlotsHandler.ts
// Purpose: HTTP handler to get multiple available R503 slots.
// Returns list of free slot IDs for display in DevTools.
// All Rights Reserved. Arodi Emmanuel

import { Request, Response } from 'express';
import { logger } from '../../../infrastructure/logging/logger.js';

const BRIDGE_URL = process.env['FINGERPRINT_BRIDGE_URL'] ?? 'http://localhost:3001';

export class AvailableSlotsHandler {
    async handle(_req: Request, res: Response): Promise<void> {
        try {
            const response = await fetch(`${BRIDGE_URL}/fingerprint/available-slots`);
            const data = await response.json() as {
                success: boolean;
                slots?: number[];
                capacity?: number;
            };

            if (data.success && data.slots) {
                res.status(200).json({ slots: data.slots, capacity: data.capacity });
            } else {
                res.status(503).json({ success: false, error: 'No available slots' });
            }
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Unknown error';
            logger.error('Get available slots error:', error);
            res.status(503).json({ success: false, error: msg });
        }
    }
}
