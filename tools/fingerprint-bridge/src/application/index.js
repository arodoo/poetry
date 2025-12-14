// File: index.js
// Purpose: Exports application layer services
// All Rights Reserved. Arodi Emmanuel

export {
  initialize, openDevice, closeDevice,
  getDeviceHandle, getDeviceAddr
} from './device-lifecycle.js';

export { captureImage, generateChar } from './image-operations.js';
export { autoEnroll, autoIdentify } from './auto-enrollment.js';
export { manualEnroll } from './manual-enrollment.js';
export { downloadTemplate } from './template-download.js';
export { uploadTemplate } from './template-upload.js';
export { getTemplateCount, deleteTemplate } from './template-management.js';
export { getAvailableSlot, getAvailableSlots } from './slot-availability.js';
export { manualIdentify } from './manual-identify.js';

