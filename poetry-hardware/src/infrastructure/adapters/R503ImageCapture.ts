// File: R503ImageCapture.ts
// Purpose: Handles fingerprint image capture from R503
// sensor with retry logic for enrollment process.
// All Rights Reserved. Arodi Emmanuel

import { R503Protocol } from '../protocols/R503Protocol.js';
import { R503Command, R503Response } from '../protocols/R503Commands.js';
import { R503CommandExecutor } from './R503CommandExecutor.js';

export class R503ImageCapture {
  constructor(
    private executor: R503CommandExecutor,
    private protocol: R503Protocol
  ) {}

  async captureToBuffer(bufferNum: number): Promise<void> {
    const maxRetries = 10;
    let retries = 0;

    while (retries < maxRetries) {
      const packet = this.protocol.buildPacket(
        R503Command.GET_IMAGE
      );
      const response = await this.executor.sendCommand(packet);

      if (response.success) {
        const cmd =
          bufferNum === 1
            ? R503Command.IMAGE_TO_BUFFER1
            : R503Command.IMAGE_TO_BUFFER2;
        const bufferPacket = this.protocol.buildPacket(cmd);
        await this.executor.sendCommand(bufferPacket);
        return;
      }

      if (response.confirmationCode === R503Response.NO_FINGER) {
        await this.executor.delay(500);
        retries++;
        continue;
      }

      throw new Error(`Capture failed: ${response.confirmationCode}`);
    }

    throw new Error('Timeout waiting for finger');
  }
}
