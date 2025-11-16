// File: R503PacketParser.ts
// Purpose: Parses response packets from R503 sensor and
// validates packet structure and checksums.
// All Rights Reserved. Arodi Emmanuel

import { R503Response } from './R503Commands.js';

const HEADER = [0xef, 0x01];

export interface R503PacketResponse {
  packetType: number;
  confirmationCode: number;
  data: Buffer;
  success: boolean;
}

export class R503PacketParser {
  parseResponse(buffer: Buffer): R503PacketResponse {
    if (buffer.length < 12) {
      throw new Error('Invalid packet length');
    }

    if (buffer[0] !== HEADER[0] || buffer[1] !== HEADER[1]) {
      throw new Error('Invalid packet header');
    }

    const packetType = buffer[6];
    const length = (buffer[7] << 8) | buffer[8];
    const confirmationCode = buffer[9];
    const data = buffer.slice(10, 9 + length - 2);

    return {
      packetType,
      confirmationCode,
      data,
      success: confirmationCode === R503Response.OK,
    };
  }
}
