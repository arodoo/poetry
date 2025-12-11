// File: MockFingerprintAdapter.ts
// Purpose: Mock adapter for fingerprint testing
// All Rights Reserved. Arodi Emmanuel

import {
  FingerprintPort,
  EnrollResult,
  VerifyResult,
} from '../../../application/ports/FingerprintPort.js';
import {
  BatchDeleteResult,
  createBatchResult,
} from '../../../application/ports/BatchDeleteResult.js';
import { logger } from '../../logging/logger.js';

export class MockFingerprintAdapter implements FingerprintPort {
  private templates: Set<number>;

  constructor() {
    this.templates = new Set([1, 2, 3]);
  }

  async initialize(): Promise<void> {
    logger.info('Mock fingerprint adapter initialized');
    return Promise.resolve();
  }

  async enroll(templateId: number): Promise<EnrollResult> {
    logger.info(`Mock: Enrolling fingerprint ${templateId}`);
    this.templates.add(templateId);
    return {
      templateId,
      success: true,
    };
  }

  async verify(): Promise<VerifyResult> {
    const templateId = Array.from(this.templates)[0] || 1;
    logger.info(`Mock: Fingerprint verified as ${templateId}`);
    return {
      matched: true,
      templateId,
      confidence: 95,
    };
  }

  async deleteTemplate(templateId: number): Promise<boolean> {
    logger.info(`Mock: Deleted template ${templateId}`);
    this.templates.delete(templateId);
    return true;
  }

  async deleteTemplates(slotIds: number[]): Promise<BatchDeleteResult> {
    const successful: number[] = [];
    for (const id of slotIds) {
      this.templates.delete(id);
      successful.push(id);
    }
    logger.info(`Mock: Batch deleted ${successful.length} templates`);
    return createBatchResult(successful, [], slotIds.length);
  }

  async getTemplateCount(): Promise<number> {
    return this.templates.size;
  }

  async findAvailableSlot(): Promise<number> {
    const maxSlot = 1500;
    for (let i = 1; i <= maxSlot; i++) {
      if (!this.templates.has(i)) {
        logger.info(`Mock: Found available slot ${i}`);
        return i;
      }
    }
    throw new Error('No available slots');
  }

  async downloadTemplate(slotId: number): Promise<Buffer | null> {
    if (!this.templates.has(slotId)) {
      return null;
    }
    logger.info(`Mock: Downloaded template ${slotId}`);
    return Buffer.from(`mock-template-${slotId}`);
  }

  async uploadTemplate(
    slotId: number,
    _template: Buffer
  ): Promise<boolean> {
    logger.info(`Mock: Uploaded template to slot ${slotId}`);
    this.templates.add(slotId);
    return true;
  }

  async close(): Promise<void> {
    logger.info('Mock fingerprint adapter closed');
    return Promise.resolve();
  }
}
