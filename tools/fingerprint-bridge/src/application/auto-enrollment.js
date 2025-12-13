// File: auto-enrollment.js
// Purpose: High-level enrollment and identification using SDK APIs.
// All Rights Reserved. Arodi Emmanuel

import { getBindings } from '../infrastructure/ffi/index.js';
import { getDeviceHandle } from './device-lifecycle.js';

export function autoEnroll(targetId) {
    const deviceHandle = getDeviceHandle();
    if (deviceHandle === null) {
        return { code: -1, message: 'Device not open' };
    }
    const bindings = getBindings();
    const outIdPtr = [0];
    const result = bindings.PS_AutoEnroll(deviceHandle, targetId, 0, outIdPtr);
    return { code: result, id: outIdPtr[0] };
}

export function autoIdentify() {
    const deviceHandle = getDeviceHandle();
    if (deviceHandle === null) {
        return { code: -1, message: 'Device not open' };
    }
    const bindings = getBindings();
    const idPtr = [0];
    const scorePtr = [0];
    const result = bindings.PS_AutoIdentify(deviceHandle, idPtr, scorePtr);
    return { code: result, id: idPtr[0], score: scorePtr[0] };
}
