// File: image-operations.js
// Purpose: Image capture and character generation operations.
// All Rights Reserved. Arodi Emmanuel

import { getBindings } from '../infrastructure/ffi/index.js';
import * as log from '../infrastructure/logging/index.js';
import { getDeviceHandle, getDeviceAddr } from './device-lifecycle.js';

export function captureImage() {
    const deviceHandle = getDeviceHandle();
    const deviceAddr = getDeviceAddr();
    if (deviceHandle === null) {
        return { code: -1, message: 'Device not open' };
    }
    const bindings = getBindings();
    const result = bindings.PSGetImage(deviceHandle, deviceAddr);
    log.sdk('PSGetImage', { handle: deviceHandle, addr: deviceAddr },
        { code: result });
    return { code: result };
}

export function generateChar(bufferId) {
    const deviceHandle = getDeviceHandle();
    const deviceAddr = getDeviceAddr();
    if (deviceHandle === null) {
        return { code: -1, message: 'Device not open' };
    }
    const bindings = getBindings();
    const result = bindings.PSGenChar(deviceHandle, deviceAddr, bufferId);
    return { code: result };
}
