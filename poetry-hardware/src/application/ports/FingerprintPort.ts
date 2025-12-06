// File: FingerprintPort.ts
// Purpose: Port for fingerprint reader communication
// All Rights Reserved. Arodi Emmanuel

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
  getTemplateCount(): Promise<number>;
  downloadTemplate(slotId: number): Promise<Buffer | null>;
  uploadTemplate(slotId: number, template: Buffer): Promise<boolean>;
  close(): Promise<void>;
}
