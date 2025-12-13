// File: template-routes.js
// Purpose: HTTP routes for template download/upload operations
// Handles backup and restore of fingerprint templates
// All Rights Reserved. Arodi Emmanuel

import { Router } from 'express';
import {
    downloadTemplate, uploadTemplate, deleteTemplate
} from '../../../application/index.js';

const router = Router();

router.get('/:slotId', (req, res) => {
    try {
        const slotId = parseInt(req.params.slotId, 10);
        if (isNaN(slotId) || slotId < 0) {
            return res.status(400).json({
                success: false,
                error: 'Invalid slotId'
            });
        }

        const result = downloadTemplate(slotId);
        if (result.code === 0) {
            res.json({
                success: true,
                template: result.template,
                size: result.size
            });
        } else {
            res.status(400).json({
                success: false,
                code: result.code,
                message: result.message
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/', (req, res) => {
    try {
        const { slotId, template } = req.body;
        if (!slotId || !template) {
            return res.status(400).json({
                success: false,
                error: 'Missing slotId or template'
            });
        }

        const result = uploadTemplate(slotId, template);
        if (result.code === 0) {
            res.json({ success: true, slotId: result.slotId });
        } else {
            res.status(400).json({
                success: false,
                code: result.code,
                message: result.message
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.delete('/:slotId', (req, res) => {
    try {
        const slotId = parseInt(req.params.slotId, 10);
        if (isNaN(slotId) || slotId < 0) {
            return res.status(400).json({
                success: false,
                error: 'Invalid slotId'
            });
        }

        const result = deleteTemplate(slotId);
        if (result.code === 0) {
            res.json({ success: true, slotId: result.slotId });
        } else {
            res.status(400).json({
                success: false,
                code: result.code,
                message: result.message
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
