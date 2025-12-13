// File: template-management.js
// Purpose: Template management operations (count, delete)
// All Rights Reserved. Arodi Emmanuel

import { getBindings } from '../infrastructure/ffi/index.js';
import * as log from '../infrastructure/logging/index.js';
import { getDeviceHandle, getDeviceAddr } from './device-lifecycle.js';

export function getTemplateCount() {
    const deviceHandle = getDeviceHandle();
    const deviceAddr = getDeviceAddr();

    if (deviceHandle === null) {
        return { code: -1, message: 'Device not open' };
    }
    const bindings = getBindings();

    // Allocate buffer for count (int pointer)
    const countBuffer = Buffer.alloc(4);

    const result = bindings.PSTemplateNum(deviceHandle, deviceAddr, countBuffer);
    log.sdk('PSTemplateNum', {}, { code: result });

    if (result !== 0) {
        return { code: result, message: 'Failed to get template count' };
    }

    const count = countBuffer.readInt32LE(0);
    return { code: 0, count };
}

export function deleteTemplate(slotId) {
    const deviceHandle = getDeviceHandle();
    const deviceAddr = getDeviceAddr();

    if (deviceHandle === null) {
        return { code: -1, message: 'Device not open' };
    }
    const bindings = getBindings();

    const result = bindings.PSDelChar(deviceHandle, deviceAddr, slotId, 1);
    log.sdk('PSDelChar', { slotId, count: 1 }, { code: result });

    if (result !== 0) {
        return { code: result, message: 'Failed to delete template' };
    }

    return { code: 0, slotId };
}
