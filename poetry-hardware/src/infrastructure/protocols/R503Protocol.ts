// File: R503Protocol.ts
// Purpose: R503 fingerprint sensor protocol facade. Combines
// packet building and parsing for sensor communication.
// All Rights Reserved. Arodi Emmanuel

export { R503Command, R503Response } from './R503Commands.js';
export { R503PacketResponse } from './R503PacketParser.js';
export { R503PacketBuilder } from './R503PacketBuilder.js';
export { R503PacketParser } from './R503PacketParser.js';

import { R503Command } from './R503Commands.js';
import { R503PacketBuilder } from './R503PacketBuilder.js';
import { R503PacketParser, R503PacketResponse } from './R503PacketParser.js';

export class R503Protocol {
  private builder: R503PacketBuilder;
  private parser: R503PacketParser;

  constructor() {
    this.builder = new R503PacketBuilder();
    this.parser = new R503PacketParser();
  }

  buildPacket(command: R503Command, params: number[] = []): Buffer {
    return this.builder.buildPacket(command, params);
  }

  parseResponse(buffer: Buffer): R503PacketResponse {
    return this.parser.parseResponse(buffer);
  }
}

