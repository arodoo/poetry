// File: FingerprintPort.ts
// Purpose: Port for fingerprint reader communication
// All Rights Reserved. Arodi Emmanuel

import { BatchDeleteResult } from './BatchDeleteResult.js';

export interface FingerprintTemplate {
  readonly id: number;
  readonly confidence: number;
}

export interface EnrollResult {
  readonly templateId: number;
  readonly success: boolean;
}

export interface VerifyResult {
  readonly matched: boolean;
  readonly templateId: number | null;
  readonly confidence: number;
}

export interface FingerprintPort {
  initialize(): Promise<void>;
  enroll(templateId: number): Promise<EnrollResult>;
  verify(): Promise<VerifyResult>;
  deleteTemplate(templateId: number): Promise<boolean>;
  deleteTemplates(slotIds: number[]): Promise<BatchDeleteResult>;
  getTemplateCount(): Promise<number>;
  findAvailableSlot(): Promise<number>;
  downloadTemplate(slotId: number): Promise<Buffer | null>;
  uploadTemplate(slotId: number, template: Buffer): Promise<boolean>;
  close(): Promise<void>;
}
