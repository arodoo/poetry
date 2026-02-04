// File: access-module.ts
// Purpose: Composition root for access control module.
// Creates access controller with relay and fingerprint operations.
// All Rights Reserved. Arodi Emmanuel

import { RelayBoard } from '../../domain/relay/RelayBoard.js';
import { ActivateRelayUseCase } from '../../application/usecases/ActivateRelayUseCase.js';
import { DeactivateRelayUseCase } from '../../application/usecases/DeactivateRelayUseCase.js';
import { AccessController } from '../../interfaces/http/AccessController.js';
import { getOrCreateRelayPort, getOrCreateFingerprintPort } from './shared-ports.js';

export async function composeAccessModule(): Promise<AccessController> {
  const relayBoard = RelayBoard.create();
  const relayPort = await getOrCreateRelayPort();
  const fingerprintPort = await getOrCreateFingerprintPort();
  const activateUseCase = new ActivateRelayUseCase(
    relayBoard,
    relayPort
  );
  const deactivateUseCase = new DeactivateRelayUseCase(
    relayBoard,
    relayPort
  );
  return new AccessController(activateUseCase, deactivateUseCase, fingerprintPort);
}
