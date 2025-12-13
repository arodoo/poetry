// File: device-lifecycle.js
// Purpose: Device initialization and lifecycle management.
// All Rights Reserved. Arodi Emmanuel

import { loadLibrary, initBindings, getBindings } from
    '../infrastructure/ffi/index.js';
import * as log from '../infrastructure/logging/index.js';

let deviceHandle = null;
let deviceAddr = 0xFFFFFFFF;
const DEVICE_USB = 0;
const DEVICE_COM = 1;
const DEVICE_UDISK = 2;

export function initialize(dllPath) {
    log.info('SERVICE', `Initializing with DLL: ${dllPath}`);
    loadLibrary(dllPath);
    initBindings();
    log.info('SERVICE', 'SDK initialized successfully');
}

export function openDevice() {
    const bindings = getBindings();
    const handlePtr = Buffer.alloc(8);

    const getCnt = (fn, name) => {
        const ptr = Buffer.alloc(4);
        try {
            const r = fn(ptr);
            const c = ptr.readInt32LE(0);
            log.sdk(name, {}, { result: r, count: c });
            return c;
        } catch (e) {
            log.error('SERVICE', `${name} failed: ${e.message}`);
            return 0;
        }
    };

    const usbCnt = getCnt(bindings.PSGetUSBDevNum, 'PSGetUSBDevNum');
    const udCnt = getCnt(bindings.PSGetUDiskNum, 'PSGetUDiskNum');

    let devType = DEVICE_USB;
    if (usbCnt <= 0) devType = DEVICE_UDISK;
    if (udCnt <= 0 && devType === DEVICE_UDISK) devType = DEVICE_COM;

    const result = bindings.PSOpenDeviceEx(handlePtr, devType, 1, 6, 2, 0);
    log.sdk('PSOpenDeviceEx', { type: devType }, { code: result });

    if (result === 0) {
        deviceHandle = handlePtr.readUInt32LE(0);
        deviceAddr = 0xFFFFFFFF;
        log.info('SERVICE', 'Device opened successfully');
    }

    return { code: result, handle: deviceHandle };
}

export function closeDevice() {
    if (deviceHandle === null) {
        return { code: -1, message: 'Device not open' };
    }
    const result = getBindings().PSCloseDeviceEx(deviceHandle);
    deviceHandle = null;
    return { code: result };
}

export const getDeviceHandle = () => deviceHandle;
export const getDeviceAddr = () => deviceAddr;
