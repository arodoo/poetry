// File: capture-routes.js
// Purpose: HTTP routes for fingerprint capture operations
// Handles image capture and character generation
// All Rights Reserved. Arodi Emmanuel

import { Router } from 'express';
import { captureImage, generateChar } from '../../../application/index.js';

const router = Router();

router.post('/', (req, res) => {
  try {
    const result = captureImage();
    if (result.code === 0) {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, code: result.code });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/genchar/:bufferId', (req, res) => {
  try {
    const bufferId = parseInt(req.params.bufferId, 10);
    const result = generateChar(bufferId);
    if (result.code === 0) {
      res.json({ success: true, bufferId });
    } else {
      res.status(400).json({ success: false, code: result.code });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
