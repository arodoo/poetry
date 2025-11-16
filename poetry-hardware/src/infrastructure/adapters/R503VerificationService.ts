// File: R503VerificationService.ts
// Purpose: Handles fingerprint verification by scanning and
// searching stored templates in R503 sensor database.
// All Rights Reserved. Arodi Emmanuel

import { R503Protocol } from '../protocols/R503Protocol.js';
import { R503Command, R503Response } from '../protocols/R503Commands.js';
import { R503CommandExecutor } from './R503CommandExecutor.js';
import { VerifyResult } from '../../application/ports/FingerprintPort.js';
import { logger } from '../logging/logger.js';

export class R503VerificationService {
  constructor(
    private executor: R503CommandExecutor,
    private protocol: R503Protocol
  ) {}

  async verify(): Promise<VerifyResult> {
    try {
      logger.info('Capturing fingerprint');
      const packet = this.protocol.buildPacket(
        R503Command.GET_IMAGE
      );
      const response = await this.executor.sendCommand(packet);

      if (!response.success) {
        logger.warn('No finger detected');
        return { matched: false, templateId: null, confidence: 0 };
      }

      logger.info('Converting to buffer');
      const bufferPacket = this.protocol.buildPacket(
        R503Command.IMAGE_TO_BUFFER1
      );
      await this.executor.sendCommand(bufferPacket);

      logger.info('Searching database');
      const searchPacket = this.protocol.buildPacket(
        R503Command.SEARCH,
        [0x01, 0x00, 0x00, 0x00, 0x64]
      );
      const searchResponse = await this.executor.sendCommand(
        searchPacket
      );

      if (searchResponse.confirmationCode === R503Response.OK) {
        const templateId =
          (searchResponse.data[0] << 8) | searchResponse.data[1];
        const confidence =
          (searchResponse.data[2] << 8) | searchResponse.data[3];

        logger.info(`Match: slot ${templateId}`);
        return { matched: true, templateId, confidence };
      }

      logger.info('No match found');
      return { matched: false, templateId: null, confidence: 0 };
    } catch (error) {
      logger.error(`Verification failed: ${error}`);
      return { matched: false, templateId: null, confidence: 0 };
    }
  }
}
