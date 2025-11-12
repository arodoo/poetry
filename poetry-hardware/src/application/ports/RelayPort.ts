// File: RelayPort.ts
// Purpose: Port for relay hardware communication
// All Rights Reserved. Arodi Emmanuel

import { RelayChannelId } from '../domain/relay/RelayChannel.js';

export interface RelayPort {
  initialize(): Promise<void>;
  turnOn(channelId: RelayChannelId): Promise<void>;
  turnOff(channelId: RelayChannelId): Promise<void>;
  getStatus(channelId: RelayChannelId): Promise<boolean>;
  close(): Promise<void>;
}
