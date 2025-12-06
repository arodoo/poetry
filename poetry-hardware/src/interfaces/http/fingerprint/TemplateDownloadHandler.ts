// File: TemplateDownloadHandler.ts
// Purpose: HTTP handler for template download operations
// Downloads fingerprint template from device slot.
// All Rights Reserved. Arodi Emmanuel

import { Request, Response } from 'express';
import { FingerprintPort } from '../../../application/ports/FingerprintPort.js';
import { logger } from '../../../infrastructure/logging/logger.js';

export class TemplateDownloadHandler {
    constructor(private fingerprintPort: FingerprintPort) { }

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { slotId } = req.params;
            const id = parseInt(slotId, 10);

            if (isNaN(id)) {
                res.status(400).json({ success: false, error: 'Invalid slotId' });
                return;
            }

            const template = await this.fingerprintPort.downloadTemplate(id);

            if (!template) {
                res.status(404).json({ success: false, error: 'Not found' });
                return;
            }

            res.status(200).json({
                success: true,
                template: template.toString('base64'),
            });
        } catch (error) {
            logger.error('Download template error:', error);
            res.status(500).json({ success: false, error: 'Download failed' });
        }
    }
}
