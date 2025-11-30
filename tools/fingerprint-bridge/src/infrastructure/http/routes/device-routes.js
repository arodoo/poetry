// File: device-routes.js
// Purpose: HTTP routes for device management operations
// Handles open/close device endpoints
// All Rights Reserved. Arodi Emmanuel

import { Router } from 'express';
import { openDevice, closeDevice, getDeviceHandle, getDeviceAddr }
  from '../../../application/index.js';

const router = Router();

router.get('/status', (req, res) => {
  res.json({
    handle: getDeviceHandle(),
    addr: getDeviceAddr(),
    addrHex: getDeviceAddr()?.toString(16)
  });
});

router.post('/open', (req, res) => {
  try {
    const result = openDevice();
    if (result.code === 0) {
      res.json({ success: true, handle: result.handle });
    } else {
      res.status(400).json({ success: false, code: result.code });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/close', (req, res) => {
  try {
    const result = closeDevice();
    res.json({ success: result.code === 0, code: result.code });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
