// File: RelayUseCases.test.ts
// Purpose: Integration tests for relay use cases
// All Rights Reserved. Arodi Emmanuel

import { RelayBoard } from '../src/domain/relay/RelayBoard';
import { MockRelayAdapter } from '../src/infrastructure/adapters/MockRelayAdapter';
import { ActivateRelayUseCase } from '../src/application/usecases/ActivateRelayUseCase';
import { DeactivateRelayUseCase } from '../src/application/usecases/DeactivateRelayUseCase';
import { GetRelayStatusUseCase } from '../src/application/usecases/GetRelayStatusUseCase';

describe('Relay Use Cases Integration', () => {
  let board: RelayBoard;
  let adapter: MockRelayAdapter;
  let activateUseCase: ActivateRelayUseCase;
  let deactivateUseCase: DeactivateRelayUseCase;
  let getStatusUseCase: GetRelayStatusUseCase;

  beforeEach(async () => {
    board = RelayBoard.create();
    adapter = new MockRelayAdapter();
    await adapter.initialize();

    activateUseCase = new ActivateRelayUseCase(board, adapter);
    deactivateUseCase = new DeactivateRelayUseCase(board, adapter);
    getStatusUseCase = new GetRelayStatusUseCase(board);
  });

  afterEach(async () => {
    await adapter.close();
  });

  test('activate use case updates domain and adapter', async () => {
    await activateUseCase.execute(1);

    const status = getStatusUseCase.execute();
    expect(status[0].isActive).toBe(true);
    expect(await adapter.getStatus(1)).toBe(true);
  });

  test('deactivate use case updates domain and adapter', async () => {
    await activateUseCase.execute(2);
    await deactivateUseCase.execute(2);

    const status = getStatusUseCase.execute();
    expect(status[1].isActive).toBe(false);
    expect(await adapter.getStatus(2)).toBe(false);
  });

  test('get status returns all channel states', () => {
    const status = getStatusUseCase.execute();
    expect(status).toHaveLength(4);
    expect(status[0].id).toBe(1);
    expect(status[3].id).toBe(4);
  });
});
