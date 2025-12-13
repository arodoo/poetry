// File: workflow-routes.js
// Purpose: HTTP routes for high-level fingerprint workflows
// Handles auto-enroll and auto-identify operations
// All Rights Reserved. Arodi Emmanuel

import { Router } from 'express';
import { manualEnroll as autoEnroll, autoIdentify, getTemplateCount } from '../../../application/index.js';

const router = Router();
// Trigger nodemon reload - timestamp: 2025-12-13 12:35

router.post('/enroll', (req, res) => {
  try {
    console.log('[BRIDGE-ROUTE] Enroll request body:', JSON.stringify(req.body));
    const targetId = req.body.id ?? 0xFFFF; // Auto-assign if not specified
    console.log('[BRIDGE-ROUTE] Target ID:', targetId);

    const result = autoEnroll(targetId);
    console.log('[BRIDGE-ROUTE] autoEnroll result:', JSON.stringify(result));

    if (result.code === 0) {
      console.log('[BRIDGE-ROUTE] Success! Returning id:', result.id);
      res.json({ success: true, id: result.id });
    } else {
      console.log('[BRIDGE-ROUTE] Failed with code:', result.code);
      res.status(400).json({ success: false, code: result.code });
    }
  } catch (error) {
    console.error('[BRIDGE-ROUTE] Exception:', error.message);
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

router.get('/template-count', (req, res) => {
  try {
    const result = getTemplateCount();
    if (result.code === 0) {
      res.json({ success: true, count: result.count });
    } else {
      res.status(400).json({ success: false, code: result.code });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
