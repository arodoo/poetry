// File: manual-enrollment.js
// Purpose: Manual enrollment with retry logic for finger detection.
// All Rights Reserved. Arodi Emmanuel

import { getBindings } from '../infrastructure/ffi/index.js';
import * as log from '../infrastructure/logging/index.js';
import { getDeviceHandle, getDeviceAddr } from './device-lifecycle.js';

export function manualEnroll(targetId) {
    const deviceHandle = getDeviceHandle();
    const deviceAddr = getDeviceAddr();
    if (deviceHandle === null) {
        return { code: -1, message: 'Device not open' };
    }

    const bindings = getBindings();
    log.info('SERVICE', `Starting manual enrollment for slot ${targetId}`);

    let imgCode = -1;
    const maxAtt = 10000;

    for (let i = 0; i < maxAtt; i++) {
        imgCode = bindings.PSGetImage(deviceHandle, deviceAddr);
        log.debug('SERVICE', `PSGetImage attempt ${i + 1}: code ${imgCode}`);

        if (imgCode === 0) {
            log.info('SERVICE', 'Finger detected on sensor');
            break;
        }

        const start = Date.now();
        while (Date.now() - start < 100) { }
    }

    if (imgCode !== 0) {
        log.error('SERVICE', `Timeout. Last code: ${imgCode}`);
        return { code: 32, id: 0 };
    }

    const genCode = bindings.PSGenChar(deviceHandle, deviceAddr, 1);
    log.sdk('PSGenChar', { buffer: 1 }, { code: genCode });

    if (genCode !== 0) {
        return { code: genCode, id: 0 };
    }

    const storeCode = bindings.PSStoreChar(deviceHandle, deviceAddr, 1, targetId);
    log.sdk('PSStoreChar', { buffer: 1, pageId: targetId }, { code: storeCode });

    if (storeCode === 0) {
        log.info('SERVICE', `Successfully enrolled to slot ${targetId}`);
        return { code: 0, id: targetId };
    }

    return { code: storeCode, id: 0 };
}
