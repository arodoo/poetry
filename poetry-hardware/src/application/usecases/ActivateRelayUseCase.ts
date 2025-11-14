// File: ActivateRelayUseCase.ts
// Purpose: Use case to activate relay channel
// All Rights Reserved. Arodi Emmanuel

import { RelayChannelId } from '../../domain/relay/RelayChannel.js';
import { RelayBoard } from '../../domain/relay/RelayBoard.js';
import { RelayPort } from '../ports/RelayPort.js';

export class ActivateRelayUseCase {
  constructor(
    private relayBoard: RelayBoard,
    private relayPort: RelayPort
  ) {}

  async execute(channelId: RelayChannelId): Promise<void> {
    this.relayBoard.activateChannel(channelId);
    await this.relayPort.turnOn(channelId);
  }
}
