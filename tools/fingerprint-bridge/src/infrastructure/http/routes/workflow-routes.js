// File: workflow-routes.js
// Purpose: HTTP routes for high-level fingerprint workflows
// Handles auto-enroll and auto-identify operations
// All Rights Reserved. Arodi Emmanuel

import { Router } from 'express';
import { autoEnroll, autoIdentify } from '../../../application/index.js';

const router = Router();

router.post('/enroll', (req, res) => {
  try {
    const targetId = req.body.id ?? 0xFFFF; // Auto-assign if not specified
    const result = autoEnroll(targetId);
    if (result.code === 0) {
      res.json({ success: true, id: result.id });
    } else {
      res.status(400).json({ success: false, code: result.code });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/identify', (req, res) => {
  try {
    const result = autoIdentify();
    if (result.code === 0) {
      res.json({ success: true, id: result.id, score: result.score });
    } else {
      res.status(400).json({ success: false, code: result.code });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
