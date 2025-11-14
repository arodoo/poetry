// File: GetRelayStatusUseCase.ts
// Purpose: Use case to get all relay channels status
// All Rights Reserved. Arodi Emmanuel

import { RelayBoard } from '../../domain/relay/RelayBoard.js';
import { RelayChannelState } from '../../domain/relay/RelayChannel.js';

export class GetRelayStatusUseCase {
  constructor(private relayBoard: RelayBoard) {}

  execute(): RelayChannelState[] {
    return this.relayBoard.getAllChannels().map((ch) => ch.toState());
  }
}
