// File: relay-module.ts
// Purpose: Composition root for relay module with dependency injection.
// Creates relay controller with its use cases and adapters.
// All Rights Reserved. Arodi Emmanuel

import { RelayBoard } from '../../domain/relay/RelayBoard.js';
import { ActivateRelayUseCase } from '../../application/usecases/ActivateRelayUseCase.js';
import { DeactivateRelayUseCase } from '../../application/usecases/DeactivateRelayUseCase.js';
import { GetRelayStatusUseCase } from '../../application/usecases/GetRelayStatusUseCase.js';
import { RelayController } from '../../interfaces/http/RelayController.js';
import { getOrCreateRelayPort } from './shared-ports.js';

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
