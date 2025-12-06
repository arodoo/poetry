// File: BridgeFingerprintOperations.ts
// Purpose: Fingerprint operations delegated to bridge service.
// Contains enroll, verify, delete, and count operations.
// All Rights Reserved. Arodi Emmanuel

import {
  EnrollResult,
  VerifyResult,
} from '../../../application/ports/FingerprintPort.js';
import { logger } from '../../logging/logger.js';
import * as bridge from './BridgeHttpClient.js';

export async function enrollFingerprint(
  templateId: number
): Promise<EnrollResult> {
  const data = await bridge.enrollFingerprint(templateId);
  return {
    templateId: data.id ?? templateId,
    success: data.code === 0,
  };
}

export async function verifyFingerprint(): Promise<VerifyResult> {
  const data = await bridge.identifyFingerprint();
  const matched = data.success === true && data.code === 0;
  return {
    matched,
    templateId: data.id ?? null,
    confidence: data.score ?? 0,
  };
}

export async function deleteTemplate(
  templateId: number
): Promise<boolean> {
  logger.warn(`deleteTemplate(${templateId}) not implemented`);
  return false;
}

export async function getTemplateCount(): Promise<number> {
  logger.warn('getTemplateCount not implemented');
  return 0;
}

export async function downloadTemplate(
  slotId: number
): Promise<Buffer | null> {
  const data = await bridge.downloadTemplate(slotId);
  if (!data.success || !data.template) {
    return null;
  }
  return Buffer.from(data.template, 'base64');
}

export async function uploadTemplate(
  slotId: number,
  template: Buffer
): Promise<boolean> {
  const data = await bridge.uploadTemplate(slotId, template);
  return data.success === true;
}
