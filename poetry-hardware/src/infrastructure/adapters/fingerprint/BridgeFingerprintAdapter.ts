// File: BridgeFingerprintAdapter.ts
// Purpose: Adapter implementing FingerprintPort via HTTP bridge.
// Delegates all operations to bridge/* modules for R503 sensor access.
// All Rights Reserved. Arodi Emmanuel

import {
  FingerprintPort,
  EnrollResult,
  VerifyResult,
} from '../../../application/ports/FingerprintPort.js';
import { BatchDeleteResult } from '../../../application/ports/BatchDeleteResult.js';
import { logger } from '../../logging/logger.js';
import * as lifecycle from '../bridge/BridgeLifecycle.js';
import * as ops from '../bridge/BridgeFingerprintOperations.js';

export class BridgeFingerprintAdapter implements FingerprintPort {
  private initialized = false;

  async initialize(): Promise<void> {
    try {
      await lifecycle.connectBridge();
      this.initialized = true;
    } catch (error) {
      logger.error(
        `Failed to connect to fingerprint bridge: ${error}`
      );
      throw error;
    }
  }

  async enroll(templateId: number): Promise<EnrollResult> {
    this.ensureInitialized();
    return ops.enrollFingerprint(templateId);
  }

  async verify(): Promise<VerifyResult> {
    this.ensureInitialized();
    return ops.verifyFingerprint();
  }

  async deleteTemplate(templateId: number): Promise<boolean> {
    this.ensureInitialized();
    return ops.deleteTemplate(templateId);
  }

  async deleteTemplates(slotIds: number[]): Promise<BatchDeleteResult> {
    this.ensureInitialized();
    return ops.deleteTemplates(slotIds);
  }

  async getTemplateCount(): Promise<number> {
    this.ensureInitialized();
    return ops.getTemplateCount();
  }

  async findAvailableSlot(): Promise<number> {
    this.ensureInitialized();
    return ops.findAvailableSlot();
  }

  async downloadTemplate(slotId: number): Promise<Buffer | null> {
    this.ensureInitialized();
    return ops.downloadTemplate(slotId);
  }

  async uploadTemplate(
    slotId: number,
    template: Buffer
  ): Promise<boolean> {
    this.ensureInitialized();
    return ops.uploadTemplate(slotId, template);
  }

  async close(): Promise<void> {
    if (!this.initialized) return;
    await lifecycle.disconnectBridge();
    this.initialized = false;
  }

  private ensureInitialized(): void {
    if (!this.initialized) {
      throw new Error('Fingerprint bridge not initialized');
    }
  }
}
