// File: AccessController.ts
// Purpose: Orchestrates fingerprint scan, verification, and relay activation.
// Supports both R503 (slot-based) and HID (FMD-based) verification flows.
// All Rights Reserved. Arodi Emmanuel

import { Request, Response } from 'express';
import { ActivateRelayUseCase } from '../../application/usecases/ActivateRelayUseCase.js';
import { DeactivateRelayUseCase } from '../../application/usecases/DeactivateRelayUseCase.js';
import { FingerprintPort } from '../../application/ports/FingerprintPort.js';
import { logger } from '../../infrastructure/logging/logger.js';

interface BackendVerifyResponse {
  matched: boolean;
  userId: number | null;
  fingerprintId: number | null;
  message: string;
}

export class AccessController {
  constructor(
    private activateUseCase: ActivateRelayUseCase,
    private deactivateUseCase: DeactivateRelayUseCase,
    private fingerprintPort: FingerprintPort
  ) { }

  verifyAndUnlock = async (_req: Request, res: Response): Promise<void> => {
    try {
      // Step 1: Scan fingerprint via configured adapter
      logger.info('Scanning fingerprint...');
      const scanResult = await this.fingerprintPort.verify();

      // Build request body based on what data we have
      const requestBody: { r503SlotId?: number; fmd?: string } = {};

      if (scanResult.fmd) {
        // HID flow: send FMD for server-side matching
        logger.info('HID scan complete, sending FMD for verification...');
        requestBody.fmd = scanResult.fmd;
      } else if (scanResult.templateId !== null) {
        // R503 flow: send slot ID for lookup
        logger.info(`R503 matched slot ${scanResult.templateId}`);
        requestBody.r503SlotId = scanResult.templateId;
      } else {
        logger.warn('Fingerprint not recognized');
        res.status(403).json({ success: false, message: 'Not recognized' });
        return;
      }

      // Step 2: Verify with backend
      const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';
      const verifyRes = await fetch(`${backendUrl}/api/v1/fingerprints/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!verifyRes.ok) throw new Error(`Backend: ${verifyRes.status}`);
      const result = (await verifyRes.json()) as BackendVerifyResponse;

      if (!result.matched) {
        res.status(403).json({ success: false, message: 'Access denied' });
        return;
      }

      // Step 3: Activate relay (skip if no relay configured)
      logger.info(`Access granted for user ${result.userId}`);
      try {
        await this.activateUseCase.execute(1);
        await new Promise((r) => setTimeout(r, 3000));
        await this.deactivateUseCase.execute(1);
      } catch (relayErr) {
        logger.warn('Relay activation skipped/failed:', relayErr);
      }

      res.status(200).json({
        success: true,
        userId: result.userId,
        message: 'Access granted',
      });
    } catch (error) {
      logger.error('Error in verify-and-unlock:', error);
      res.status(500).json({ success: false, error: 'Verification failed' });
    }
  };
}
