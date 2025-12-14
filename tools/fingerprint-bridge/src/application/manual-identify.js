// File: manual-identify.js
// Purpose: Manual identification with wait loop for finger detection.
// All Rights Reserved. Arodi Emmanuel

import { getBindings } from '../infrastructure/ffi/index.js';
import * as log from '../infrastructure/logging/index.js';
import { getDeviceHandle, getDeviceAddr } from './device-lifecycle.js';
import { R503_CAPACITY } from './sensor-constants.js';

export function manualIdentify() {
    const deviceHandle = getDeviceHandle();
    const deviceAddr = getDeviceAddr();
    if (deviceHandle === null) {
        return { code: -1, message: 'Device not open' };
    }

    const bindings = getBindings();
    log.info('SERVICE', 'Waiting for finger on sensor...');

    // Step 1: Wait for finger (10000 attempts, ~100ms each = ~16 min max)
    let imgCode = -1;
    for (let i = 0; i < 10000; i++) {
        imgCode = bindings.PSGetImage(deviceHandle, deviceAddr);
        if (imgCode === 0) {
            log.info('SERVICE', 'Finger detected');
            break;
        }
        const start = Date.now();
        while (Date.now() - start < 100) { }
    }

    if (imgCode !== 0) {
        log.error('SERVICE', `Timeout waiting for finger. Code: ${imgCode}`);
        return { code: 32, id: 0, score: 0 };
    }

    // Step 2: Generate template to CharBuffer 1
    const genCode = bindings.PSGenChar(deviceHandle, deviceAddr, 1);
    if (genCode !== 0) {
        return { code: genCode, id: 0, score: 0 };
    }

    // Step 3: Search for match in sensor database
    const idPtr = Buffer.alloc(4);
    const scorePtr = Buffer.alloc(4);
    const searchCode = bindings.PSSearch(deviceHandle, deviceAddr, 1, 0, R503_CAPACITY, idPtr, scorePtr);

    if (searchCode === 0) {
        const id = idPtr.readInt32LE(0);
        const score = scorePtr.readInt32LE(0);
        log.info('SERVICE', `Match found: slot ${id}, score ${score}`);
        return { code: 0, id, score };
    }

    log.warn('SERVICE', `No match found. Search code: ${searchCode}`);
    return { code: searchCode, id: 0, score: 0 };
}
