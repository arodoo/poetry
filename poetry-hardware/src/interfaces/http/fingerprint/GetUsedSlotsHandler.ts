// File: GetUsedSlotsHandler.ts
// Purpose: Handler to scan R503 sensor and return list of used slot IDs.
// For dev/debug purposes to compare hardware state vs database.
// All Rights Reserved. Arodi Emmanuel

import { Request, Response } from 'express';
import { FingerprintPort } from '../../../application/ports/FingerprintPort.js';
import { logger } from '../../../infrastructure/logging/logger.js';

const MAX_SLOTS = 1500;

export class GetUsedSlotsHandler {
    constructor(private fingerprintPort: FingerprintPort) { }

    handle = async (_req: Request, res: Response): Promise<void> => {
        try {
            const usedSlots: number[] = [];
            const count = await this.fingerprintPort.getTemplateCount();

            if (count === 0) {
                res.json({ success: true, count: 0, slots: [] });
                return;
            }

            // Scan slots to find which ones have templates
            for (let i = 0; i < MAX_SLOTS && usedSlots.length < count; i++) {
                const template = await this.fingerprintPort.downloadTemplate(i);
                if (template !== null) {
                    usedSlots.push(i);
                }
            }

            logger.info(`Found ${usedSlots.length} used slots on sensor`);
            res.json({ success: true, count: usedSlots.length, slots: usedSlots });
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Unknown error';
            logger.error(`GetUsedSlots failed: ${msg}`);
            res.status(500).json({ success: false, error: msg });
        }
    };
}
