// File: shared-ports.ts
// Purpose: Singleton factory for shared hardware port instances.
// Ensures relay and fingerprint ports are only initialized once.
// All Rights Reserved. Arodi Emmanuel

import { RelayPort } from '../../application/ports/RelayPort.js';
import { FingerprintPort } from '../../application/ports/FingerprintPort.js';
import { MockRelayAdapter } from '../../infrastructure/adapters/relay/MockRelayAdapter.js';
import { SerialRelayAdapter } from '../../infrastructure/adapters/relay/SerialRelayAdapter.js';
import { MockFingerprintAdapter } from '../../infrastructure/adapters/fingerprint/MockFingerprintAdapter.js';
import { BridgeFingerprintAdapter } from '../../infrastructure/adapters/fingerprint/BridgeFingerprintAdapter.js';
import { HidFingerprintAdapter } from '../../infrastructure/adapters/fingerprint/HidFingerprintAdapter.js';

let sharedRelayPort: RelayPort | null = null;
let sharedFingerprintPort: FingerprintPort | null = null;

export async function getOrCreateRelayPort(): Promise<RelayPort> {
  if (!sharedRelayPort) {
    const isMockMode = process.env.MOCK_MODE === 'true';
    sharedRelayPort = isMockMode
      ? new MockRelayAdapter()
      : new SerialRelayAdapter(process.env.USB_TTL_PORT || 'COM3');
    await sharedRelayPort.initialize();
  }
  return sharedRelayPort;
}

export async function getOrCreateFingerprintPort(): Promise<FingerprintPort> {
  if (!sharedFingerprintPort) {
    const isMockMode = process.env.MOCK_MODE === 'true';
    const adapterType = process.env.FINGERPRINT_ADAPTER || 'bridge';

    if (isMockMode) {
      sharedFingerprintPort = new MockFingerprintAdapter();
    } else if (adapterType === 'hid') {
      sharedFingerprintPort = new HidFingerprintAdapter();
    } else {
      sharedFingerprintPort = new BridgeFingerprintAdapter();
    }
    await sharedFingerprintPort.initialize();
  }
  return sharedFingerprintPort;
}
