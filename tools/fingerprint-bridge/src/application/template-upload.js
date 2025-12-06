// File: template-upload.js
// Purpose: Upload template from host to device flash
// Handles PSDownChar and PSStoreChar FFI calls
// All Rights Reserved. Arodi Emmanuel

import { getBindings } from '../infrastructure/ffi/index.js';
import * as log from '../infrastructure/logging/index.js';
import { getDeviceHandle, getDeviceAddr } from './fingerprint-service.js';

const TEMPLATE_SIZE = 768;

/**
 * Upload template from host to device flash
 * Steps: 1. Download template from host to CharBuffer
 *        2. Store CharBuffer to flash
 */
export function uploadTemplate(slotId, templateBase64) {
    const deviceHandle = getDeviceHandle();
    const deviceAddr = getDeviceAddr();

    if (deviceHandle === null) {
        return { code: -1, message: 'Device not open' };
    }
    const bindings = getBindings();

    const templateBuffer = Buffer.from(templateBase64, 'base64');
    if (templateBuffer.length !== TEMPLATE_SIZE) {
        return { code: -2, message: `Invalid size: ${templateBuffer.length}` };
    }

    const downResult = bindings.PSDownChar(
        deviceHandle, deviceAddr, 1, templateBuffer, TEMPLATE_SIZE
    );
    log.sdk('PSDownChar', { bufID: 1, len: TEMPLATE_SIZE }, { code: downResult });

    if (downResult !== 0) {
        return { code: downResult, message: 'Failed to download template' };
    }

    const storeResult = bindings.PSStoreChar(deviceHandle, deviceAddr, 1, slotId);
    log.sdk('PSStoreChar', { bufID: 1, slotId }, { code: storeResult });

    if (storeResult !== 0) {
        return { code: storeResult, message: 'Failed to store template' };
    }

    return { code: 0, slotId };
}
