// File: R503PacketBuilder.ts
// Purpose: Builds command packets for R503 sensor with
// proper header checksum and structure.
// All Rights Reserved. Arodi Emmanuel

import { R503Command } from './R503Commands.js';

const HEADER = [0xef, 0x01];
const DEFAULT_ADDRESS = [0xff, 0xff, 0xff, 0xff];
const PACKET_TYPE_COMMAND = 0x01;

export class R503PacketBuilder {
  buildPacket(command: R503Command, params: number[] = []): Buffer {
    const length = params.length + 3;
    const packet = [
      ...HEADER,
      ...DEFAULT_ADDRESS,
      PACKET_TYPE_COMMAND,
      (length >> 8) & 0xff,
      length & 0xff,
      command,
      ...params,
    ];

    const checksum = this.calculateChecksum(packet.slice(6));
    packet.push((checksum >> 8) & 0xff, checksum & 0xff);

    return Buffer.from(packet);
  }

  private calculateChecksum(data: number[]): number {
    return data.reduce((sum, byte) => sum + byte, 0) & 0xffff;
  }
}
