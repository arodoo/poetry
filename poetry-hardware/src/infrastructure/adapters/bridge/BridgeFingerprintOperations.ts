// File: BridgeFingerprintOperations.ts
// Purpose: Fingerprint operations delegated to bridge service.
// Contains enroll, verify, delete, and count operations.
// All Rights Reserved. Arodi Emmanuel

import {
  EnrollResult,
  VerifyResult,
} from '../../../application/ports/FingerprintPort.js';
import {
  BatchDeleteResult,
  SlotError,
  createBatchResult,
} from '../../../application/ports/BatchDeleteResult.js';
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

export async function deleteTemplates(
  slotIds: number[]
): Promise<BatchDeleteResult> {
  const successful: number[] = [];
  const failed: SlotError[] = [];

  for (const slotId of slotIds) {
    try {
      const success = await bridge.deleteTemplateFromDevice(slotId);
      if (success) {
        successful.push(slotId);
      } else {
        failed.push({ slotId, error: 'Device returned failure' });
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      failed.push({ slotId, error: msg });
      logger.error(`Failed to delete slot ${slotId}: ${msg}`);
    }
  }

  logger.info(`Batch delete: ${successful.length}/${slotIds.length} succeeded`);
  return createBatchResult(successful, failed, slotIds.length);
}

export async function getTemplateCount(): Promise<number> {
  logger.warn('getTemplateCount not implemented');
  return 0;
}

export async function findAvailableSlot(): Promise<number> {
  const data = await bridge.getAvailableSlot();
  if (data.slotId === undefined || data.slotId === null) {
    throw new Error('No available slots');
  }
  return data.slotId;
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
