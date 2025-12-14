// File: AccessController.ts
// Purpose: Orchestrates fingerprint scan, verification, and relay activation.
// All Rights Reserved. Arodi Emmanuel

import { Request, Response } from 'express';
import { ActivateRelayUseCase } from '../../application/usecases/ActivateRelayUseCase.js';
import { DeactivateRelayUseCase } from '../../application/usecases/DeactivateRelayUseCase.js';
import { logger } from '../../infrastructure/logging/logger.js';
import { verifyFingerprint } from '../../infrastructure/adapters/bridge/verification-operations.js';

interface BackendVerifyResponse {
  matched: boolean;
  userId: number | null;
  fingerprintId: number | null;
  message: string;
}

export class AccessController {
  constructor(
    private activateUseCase: ActivateRelayUseCase,
    private deactivateUseCase: DeactivateRelayUseCase
  ) { }

  verifyAndUnlock = async (_req: Request, res: Response): Promise<void> => {
    try {
      // Step 1: Scan fingerprint via bridge (waits for finger on sensor)
      logger.info('Scanning fingerprint on sensor...');
      const scanResult = await verifyFingerprint();

      if (!scanResult.matched || scanResult.templateId === null) {
        logger.warn('Fingerprint not recognized by sensor');
        res.status(403).json({ success: false, message: 'Fingerprint not recognized' });
        return;
      }

      const r503SlotId = scanResult.templateId;
      logger.info(`Sensor matched slot ${r503SlotId}, verifying with backend...`);

      // Step 2: Verify with backend to get user info
      const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';
      const verifyRes = await fetch(`${backendUrl}/api/v1/fingerprints/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ r503SlotId }),
      });

      if (!verifyRes.ok) throw new Error(`Backend returned ${verifyRes.status}`);
      const result = (await verifyRes.json()) as BackendVerifyResponse;

      if (!result.matched) {
        res.status(403).json({ success: false, message: 'Access denied' });
        return;
      }

      // Step 3: Activate relay
      logger.info(`Access granted for user ${result.userId}`);
      await this.activateUseCase.execute(1);
      await new Promise((r) => setTimeout(r, 3000));
      await this.deactivateUseCase.execute(1);

      res.status(200).json({ success: true, userId: result.userId, message: 'Access granted' });
    } catch (error) {
      logger.error('Error in verify-and-unlock:', error);
      res.status(500).json({ success: false, error: 'access.verification.failed' });
    }
  };
}
