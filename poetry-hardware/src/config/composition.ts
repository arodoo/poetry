// File: composition.ts
// Purpose: Dependency injection composition root
// All Rights Reserved. Arodi Emmanuel

import { RelayBoard } from '../domain/relay/RelayBoard.js';
import { ActivateRelayUseCase } from '../application/usecases/ActivateRelayUseCase.js';
import { DeactivateRelayUseCase } from '../application/usecases/DeactivateRelayUseCase.js';
import { GetRelayStatusUseCase } from '../application/usecases/GetRelayStatusUseCase.js';
import { MockRelayAdapter } from '../infrastructure/adapters/MockRelayAdapter.js';
import { SerialRelayAdapter } from '../infrastructure/adapters/SerialRelayAdapter.js';
import { RelayPort } from '../application/ports/RelayPort.js';
import { RelayController } from '../interfaces/http/RelayController.js';
import { AccessController } from '../interfaces/http/AccessController.js';

// Singleton relay port instance to avoid opening COM port twice
let sharedRelayPort: RelayPort | null = null;

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
