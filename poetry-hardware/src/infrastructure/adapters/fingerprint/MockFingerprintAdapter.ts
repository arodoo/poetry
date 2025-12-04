// File: MockFingerprintAdapter.ts
// Purpose: Mock adapter for fingerprint testing
// All Rights Reserved. Arodi Emmanuel

import {
  FingerprintPort,
  EnrollResult,
  VerifyResult,
} from '../../../application/ports/FingerprintPort.js';
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

  async getTemplateCount(): Promise<number> {
    return this.templates.size;
  }

  async close(): Promise<void> {
    logger.info('Mock fingerprint adapter closed');
    return Promise.resolve();
  }
}
