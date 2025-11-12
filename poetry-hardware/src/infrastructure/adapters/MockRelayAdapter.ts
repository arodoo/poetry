// File: MockRelayAdapter.ts
// Purpose: Mock adapter for testing without hardware
// All Rights Reserved. Arodi Emmanuel

import { RelayPort } from '../../application/ports/RelayPort.js';
import { RelayChannelId } from '../../domain/relay/RelayChannel.js';
import { logger } from '../logging/logger.js';

export class MockRelayAdapter implements RelayPort {
  private channelStates: Map<RelayChannelId, boolean>;

  constructor() {
    this.channelStates = new Map([
      [1, false],
      [2, false],
      [3, false],
      [4, false],
    ]);
  }

  async initialize(): Promise<void> {
    logger.info('Mock relay adapter initialized');
    return Promise.resolve();
  }

  async turnOn(channelId: RelayChannelId): Promise<void> {
    this.channelStates.set(channelId, true);
    logger.info(`Mock: Channel ${channelId} turned ON`);
    return Promise.resolve();
  }

  async turnOff(channelId: RelayChannelId): Promise<void> {
    this.channelStates.set(channelId, false);
    logger.info(`Mock: Channel ${channelId} turned OFF`);
    return Promise.resolve();
  }

  async getStatus(channelId: RelayChannelId): Promise<boolean> {
    return Promise.resolve(
      this.channelStates.get(channelId) || false
    );
  }

  async close(): Promise<void> {
    logger.info('Mock relay adapter closed');
    return Promise.resolve();
  }
}
