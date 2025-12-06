// File: TemplateUploadHandler.ts
// Purpose: HTTP handler for template upload operations
// Uploads fingerprint template to device slot.
// All Rights Reserved. Arodi Emmanuel

import { Request, Response } from 'express';
import { FingerprintPort } from '../../../application/ports/FingerprintPort.js';
import { logger } from '../../../infrastructure/logging/logger.js';

export class TemplateUploadHandler {
    constructor(private fingerprintPort: FingerprintPort) { }

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { slotId, template } = req.body as {
                slotId: number;
                template: string;
            };

            if (!slotId || !template) {
                res.status(400).json({ success: false, error: 'Missing params' });
                return;
            }

            const templateBuffer = Buffer.from(template, 'base64');
            const success = await this.fingerprintPort.uploadTemplate(
                slotId,
                templateBuffer
            );

            res.status(200).json({ success });
        } catch (error) {
            logger.error('Upload template error:', error);
            res.status(500).json({ success: false, error: 'Upload failed' });
        }
    }
}
