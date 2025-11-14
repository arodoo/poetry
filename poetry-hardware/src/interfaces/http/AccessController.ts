// File: AccessController.ts
// Purpose: Orchestrates fingerprint verification and relay activation
// for access control. Calls backend API for verification then triggers relay.
// All Rights Reserved.

import { Request, Response } from 'express';
import { ActivateRelayUseCase } from '../../application/usecases/ActivateRelayUseCase.js';
import { DeactivateRelayUseCase } from '../../application/usecases/DeactivateRelayUseCase.js';
import { logger } from '../../infrastructure/logging/logger.js';

interface VerifyResponse {
  matched: boolean;
  userId: number | null;
  fingerprintId: number | null;
  message: string;
}

export class AccessController {
  constructor(
    private activateUseCase: ActivateRelayUseCase,
    private deactivateUseCase: DeactivateRelayUseCase
  ) {}

  verifyAndUnlock = async (
    _req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';
      const capturedTemplate = 'DEV_BYPASS';

      logger.info('Verifying fingerprint with backend...');

      const verifyResponse = await fetch(
        `${backendUrl}/api/v1/fingerprints/verify`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ capturedTemplate }),
        }
      );

      if (!verifyResponse.ok) {
        throw new Error(`Backend returned ${verifyResponse.status}`);
      }

      const result = (await verifyResponse.json()) as VerifyResponse;

      if (!result.matched) {
        logger.warn('Fingerprint verification failed');
        res.status(403).json({
          success: false,
          message: 'Access denied',
        });
        return;
      }

      logger.info(`Access granted for user ${result.userId}`);

      await this.activateUseCase.execute(1);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await this.deactivateUseCase.execute(1);

      res.status(200).json({
        success: true,
        userId: result.userId,
        message: 'Access granted, relay activated',
      });
    } catch (error) {
      logger.error('Error in verify-and-unlock:', error);
      res.status(500).json({
        success: false,
        error: 'access.verification.failed',
      });
    }
  };
}
