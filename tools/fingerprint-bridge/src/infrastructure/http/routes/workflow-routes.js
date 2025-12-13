// File: workflow-routes.js
// Purpose: HTTP routes for high-level fingerprint workflows
// All Rights Reserved. Arodi Emmanuel

import { Router } from 'express';
import { manualEnroll as autoEnroll, autoIdentify, getTemplateCount, getAvailableSlot, getAvailableSlots } from '../../../application/index.js';

const router = Router();

router.post('/enroll', (req, res) => {
  try {
    const targetId = req.body.id ?? 0xFFFF;
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
    result.code === 0
      ? res.json({ success: true, id: result.id, score: result.score })
      : res.status(400).json({ success: false, code: result.code });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/template-count', (req, res) => {
  try {
    const result = getTemplateCount();
    result.code === 0
      ? res.json({ success: true, count: result.count })
      : res.status(400).json({ success: false, code: result.code });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/available-slot', (req, res) => {
  try {
    const result = getAvailableSlot();
    result.code === 0
      ? res.json({ success: true, slotId: result.slotId })
      : res.status(400).json({ success: false, code: result.code });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/available-slots', (req, res) => {
  try {
    const result = getAvailableSlots();
    res.json({ success: result.code === 0, ...result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
