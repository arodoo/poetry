// File: MockRelayAdapter.test.ts
// Purpose: Tests for mock relay adapter
// All Rights Reserved. Arodi Emmanuel

import { MockRelayAdapter } from '../src/infrastructure/adapters/MockRelayAdapter';

describe('MockRelayAdapter', () => {
  let adapter: MockRelayAdapter;

  beforeEach(async () => {
    adapter = new MockRelayAdapter();
    await adapter.initialize();
  });

  afterEach(async () => {
    await adapter.close();
  });

  test('initializes successfully', async () => {
    expect(adapter).toBeDefined();
  });

  test('turns channel on', async () => {
    await adapter.turnOn(1);
    const status = await adapter.getStatus(1);
    expect(status).toBe(true);
  });

  test('turns channel off', async () => {
    await adapter.turnOn(2);
    await adapter.turnOff(2);
    const status = await adapter.getStatus(2);
    expect(status).toBe(false);
  });

  test('maintains independent channel states', async () => {
    await adapter.turnOn(1);
    await adapter.turnOn(3);

    expect(await adapter.getStatus(1)).toBe(true);
    expect(await adapter.getStatus(2)).toBe(false);
    expect(await adapter.getStatus(3)).toBe(true);
    expect(await adapter.getStatus(4)).toBe(false);
  });
});
