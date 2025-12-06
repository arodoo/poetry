// File: template-download.js
// Purpose: Download template from device flash to host
// Handles PSLoadChar and PSUpChar FFI calls
// All Rights Reserved. Arodi Emmanuel

import { getBindings } from '../infrastructure/ffi/index.js';
import * as log from '../infrastructure/logging/index.js';
import { getDeviceHandle, getDeviceAddr } from './fingerprint-service.js';

const TEMPLATE_SIZE = 768;

/**
 * Download template from device flash to host
 * Steps: 1. Load template from flash to CharBuffer
 *        2. Upload CharBuffer to host
 */
export function downloadTemplate(slotId) {
    const deviceHandle = getDeviceHandle();
    const deviceAddr = getDeviceAddr();

    if (deviceHandle === null) {
        return { code: -1, message: 'Device not open' };
    }
    const bindings = getBindings();

    const loadResult = bindings.PSLoadChar(deviceHandle, deviceAddr, 1, slotId);
    log.sdk('PSLoadChar', { slotId, bufID: 1 }, { code: loadResult });

    if (loadResult !== 0) {
        return { code: loadResult, message: 'Failed to load template' };
    }

    const templateBuffer = Buffer.alloc(TEMPLATE_SIZE);
    const upResult = bindings.PSUpChar(deviceHandle, deviceAddr, 1, templateBuffer);
    log.sdk('PSUpChar', { bufID: 1 }, { code: upResult });

    if (upResult !== 0) {
        return { code: upResult, message: 'Failed to upload template' };
    }

    return {
        code: 0,
        template: templateBuffer.toString('base64'),
        size: TEMPLATE_SIZE
    };
}
