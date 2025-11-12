// File: RelayBoard.ts
// Purpose: Aggregate for 4-channel relay board
// All Rights Reserved. Arodi Emmanuel

import { RelayChannel, RelayChannelId } from './RelayChannel.js';

export class RelayBoard {
  private channels: Map<RelayChannelId, RelayChannel>;

  private constructor() {
    this.channels = new Map();
    [1, 2, 3, 4].forEach((id) => {
      this.channels.set(
        id as RelayChannelId,
        RelayChannel.create(id as RelayChannelId)
      );
    });
  }

  static create(): RelayBoard {
    return new RelayBoard();
  }

  getChannel(id: RelayChannelId): RelayChannel {
    const channel = this.channels.get(id);
    if (!channel) {
      throw new Error('relay.channel.notfound');
    }
    return channel;
  }

  activateChannel(id: RelayChannelId): void {
    const channel = this.getChannel(id);
    this.channels.set(id, channel.activate());
  }

  deactivateChannel(id: RelayChannelId): void {
    const channel = this.getChannel(id);
    this.channels.set(id, channel.deactivate());
  }

  getAllChannels(): RelayChannel[] {
    return Array.from(this.channels.values());
  }
}
