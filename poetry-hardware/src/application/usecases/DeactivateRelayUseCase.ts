// File: DeactivateRelayUseCase.ts
// Purpose: Use case to deactivate relay channel
// All Rights Reserved. Arodi Emmanuel

import { RelayChannelId } from '../domain/relay/RelayChannel.js';
import { RelayBoard } from '../domain/relay/RelayBoard.js';
import { RelayPort } from './ports/RelayPort.js';

export class DeactivateRelayUseCase {
  constructor(
    private relayBoard: RelayBoard,
    private relayPort: RelayPort
  ) {}

  async execute(channelId: RelayChannelId): Promise<void> {
    this.relayBoard.deactivateChannel(channelId);
    await this.relayPort.turnOff(channelId);
  }
}
