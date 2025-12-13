// File: verification-operations.ts
// Purpose: Verification, deletion & template management via bridge.
// All Rights Reserved. Arodi Emmanuel

import {
    VerifyResult,
} from '../../../application/ports/FingerprintPort.js';
import {
    BatchDeleteResult,
    SlotError,
    createBatchResult,
} from '../../../application/ports/BatchDeleteResult.js';
import { logger } from '../../logging/logger.js';
import * as bridge from './BridgeHttpClient.js';

export async function verifyFingerprint(): Promise<VerifyResult> {
    const data = await bridge.identifyFingerprint();
    const matched = data.success === true && data.code === 0;
    return {
        matched,
        templateId: data.id ?? null,
        confidence: data.score ?? 0,
    };
}

export async function deleteTemplate(templateId: number): Promise<boolean> {
    const success = await bridge.deleteTemplateFromDevice(templateId);
    if (!success) {
        logger.error(`[BRIDGE] Failed to delete template ${templateId}`);
    }
    return success;
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

    logger.info(`Batch delete: ${successful.length}/${slotIds.length}`);
    return createBatchResult(successful, failed, slotIds.length);
}

export async function getTemplateCount(): Promise<number> {
    const data = await bridge.getTemplateCount();
    if (!data.success || data.count === undefined) {
        logger.error('[BRIDGE] Failed to get template count');
        return 0;
    }
    return data.count;
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
