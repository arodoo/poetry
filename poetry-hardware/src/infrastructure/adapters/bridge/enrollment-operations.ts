// File: enrollment-operations.ts
// Purpose: Enrollment operations via bridge service.
// All Rights Reserved. Arodi Emmanuel

import { EnrollResult } from '../../../application/ports/FingerprintPort.js';
import { logger } from '../../logging/logger.js';
import * as bridge from './BridgeHttpClient.js';

export async function enrollFingerprint(
    templateId: number
): Promise<EnrollResult> {
    logger.info(
        `[BRIDGE] Calling enrollFingerprint with templateId: ${templateId}`
    );

    const data = await bridge.enrollFingerprint(templateId);

    logger.info(`[BRIDGE] Enroll response: ${JSON.stringify(data)}`);
    logger.info(
        `[BRIDGE] data.code: ${data.code}, data.success: ${data.success}, data.id: ${data.id}`
    );

    const success = data.success === true;
    logger.info(`[BRIDGE] Enrollment success: ${success}`);

    return {
        templateId: data.id ?? templateId,
        success,
    };
}

export async function findAvailableSlot(): Promise<number | null> {
    try {
        const data = await bridge.getAvailableSlot();

        if (data.slotId === undefined || data.slotId === null) {
            logger.error('[BRIDGE] No available slot returned');
            return null;
        }

        return data.slotId;
    } catch (error) {
        logger.error(`[BRIDGE] Error finding slot: ${error}`);
        return null;
    }
}
