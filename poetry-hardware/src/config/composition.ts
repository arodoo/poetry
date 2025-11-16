// File: composition.ts
// Purpose: Dependency injection composition root
// All Rights Reserved. Arodi Emmanuel

import { RelayBoard } from '../domain/relay/RelayBoard.js';
import { ActivateRelayUseCase } from '../application/usecases/ActivateRelayUseCase.js';
import { DeactivateRelayUseCase } from '../application/usecases/DeactivateRelayUseCase.js';
import { GetRelayStatusUseCase } from '../application/usecases/GetRelayStatusUseCase.js';
import { MockRelayAdapter } from '../infrastructure/adapters/MockRelayAdapter.js';
import { SerialRelayAdapter } from '../infrastructure/adapters/SerialRelayAdapter.js';
import { MockFingerprintAdapter } from '../infrastructure/adapters/MockFingerprintAdapter.js';
import { UsbFingerprintAdapter } from '../infrastructure/adapters/UsbFingerprintAdapter.js';
import { RelayPort } from '../application/ports/RelayPort.js';
import { FingerprintPort } from '../application/ports/FingerprintPort.js';
import { RelayController } from '../interfaces/http/RelayController.js';
import { AccessController } from '../interfaces/http/AccessController.js';
import { FingerprintController } from '../interfaces/http/FingerprintController.js';

let sharedRelayPort: RelayPort | null = null;
let sharedFingerprintPort: FingerprintPort | null = null;

async function getOrCreateRelayPort(): Promise<RelayPort> {
  if (!sharedRelayPort) {
    const isMockMode = process.env.MOCK_MODE === 'true';
    sharedRelayPort = isMockMode
      ? new MockRelayAdapter()
      : new SerialRelayAdapter(process.env.USB_TTL_PORT || 'COM3');

    await sharedRelayPort.initialize();
  }
  return sharedRelayPort;
}

async function getOrCreateFingerprintPort(): Promise<FingerprintPort> {
  if (!sharedFingerprintPort) {
    const isMockMode = process.env.MOCK_MODE === 'true';
    sharedFingerprintPort = isMockMode
      ? new MockFingerprintAdapter()
      : new UsbFingerprintAdapter();

    await sharedFingerprintPort.initialize();
  }
  return sharedFingerprintPort;
}

export async function composeRelayModule(): Promise<RelayController> {
  const relayBoard = RelayBoard.create();
  const relayPort = await getOrCreateRelayPort();

  const activateUseCase = new ActivateRelayUseCase(
    relayBoard,
    relayPort
  );
  const deactivateUseCase = new DeactivateRelayUseCase(
    relayBoard,
    relayPort
  );
  const getStatusUseCase = new GetRelayStatusUseCase(relayBoard);

  return new RelayController(
    activateUseCase,
    deactivateUseCase,
    getStatusUseCase
  );
}

export async function composeAccessModule(): Promise<AccessController> {
  const relayBoard = RelayBoard.create();
  const relayPort = await getOrCreateRelayPort();

  const activateUseCase = new ActivateRelayUseCase(
    relayBoard,
    relayPort
  );
  const deactivateUseCase = new DeactivateRelayUseCase(
    relayBoard,
    relayPort
  );

  return new AccessController(activateUseCase, deactivateUseCase);
}

export async function composeFingerprintModule(): Promise<FingerprintController> {
  const fingerprintPort = await getOrCreateFingerprintPort();
  return new FingerprintController(fingerprintPort);
}

