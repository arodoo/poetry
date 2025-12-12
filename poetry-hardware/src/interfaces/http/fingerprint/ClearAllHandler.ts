// File: ClearAllHandler.ts
// Purpose: Handler for clearing all fingerprint templates from R503.
// Used during dev mode startup to sync sensor with empty database.
// All Rights Reserved. Arodi Emmanuel

import { Request, Response } from 'express';
import { FingerprintPort } from '../../../application/ports/FingerprintPort.js';

export class ClearAllHandler {
    private fingerprintPort: FingerprintPort;

    constructor(fingerprintPort: FingerprintPort) {
        this.fingerprintPort = fingerprintPort;
    }

    handle = async (_req: Request, res: Response): Promise<void> => {
        try {
            const count = await this.fingerprintPort.getTemplateCount();
            if (count === 0) {
                res.json({ success: true, deletedCount: 0, message: 'empty' });
                return;
            }

            const slotIds = await this.getAllUsedSlots(count);
            const result = await this.fingerprintPort.deleteTemplates(slotIds);

            res.json({
                success: result.failedSlots.length === 0,
                deletedCount: result.successfulSlots.length,
                failedCount: result.failedSlots.length,
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown';
            res.status(500).json({ success: false, error: message });
        }
    };

    private async getAllUsedSlots(maxCount: number): Promise<number[]> {
        const slots: number[] = [];
        for (let i = 0; i < maxCount && slots.length < 1500; i++) {
            slots.push(i);
        }
        return slots;
    }
}
