// File: fingerprint-module.ts
// Purpose: Composition root for fingerprint module.
// Creates fingerprint controller with bridge adapter for R503 sensor.
// All Rights Reserved. Arodi Emmanuel

import { FingerprintController } from '../../interfaces/http/FingerprintController.js';
import { getOrCreateFingerprintPort } from './shared-ports.js';

export async function composeFingerprintModule(): Promise<FingerprintController> {
  const fingerprintPort = await getOrCreateFingerprintPort();
  return new FingerprintController(fingerprintPort);
}
