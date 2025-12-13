// File: slot-availability.js
// Purpose: Functions to find available R503 slots by scanning sensor
// All Rights Reserved. Arodi Emmanuel

import { getBindings } from '../infrastructure/ffi/index.js';
import * as log from '../infrastructure/logging/index.js';
import { getDeviceHandle, getDeviceAddr } from './device-lifecycle.js';
import { R503_CAPACITY } from './sensor-constants.js';

export function getAvailableSlot() {
    try {
        const deviceHandle = getDeviceHandle();
        const deviceAddr = getDeviceAddr();

        if (deviceHandle === null) {
            return { code: -1, message: 'Device not open' };
        }
        const bindings = getBindings();

        for (let slotId = 0; slotId < R503_CAPACITY; slotId++) {
            const loadResult = bindings.PSLoadChar(deviceHandle, deviceAddr, 1, slotId);
            if (loadResult !== 0) {
                log.sdk('getAvailableSlot', {}, { slotId, loadResult });
                return { code: 0, slotId };
            }
        }
        return { code: -1, message: 'No available slots' };
    } catch (error) {
        log.error('SERVICE', `getAvailableSlot failed: ${error.message}`);
        return { code: -1, message: error.message };
    }
}

export function getAvailableSlots() {
    try {
        const deviceHandle = getDeviceHandle();
        const deviceAddr = getDeviceAddr();

        if (deviceHandle === null) {
            return { code: -1, slots: [], capacity: 0 };
        }
        const bindings = getBindings();
        const slots = [];

        for (let slotId = 0; slotId < R503_CAPACITY; slotId++) {
            const loadResult = bindings.PSLoadChar(deviceHandle, deviceAddr, 1, slotId);
            if (loadResult !== 0) slots.push(slotId);
        }
        log.sdk('getAvailableSlots', {}, { count: slots.length, capacity: R503_CAPACITY });
        return { code: 0, slots, capacity: R503_CAPACITY };
    } catch (error) {
        log.error('SERVICE', `getAvailableSlots failed: ${error.message}`);
        return { code: -1, slots: [], capacity: 0 };
    }
}

