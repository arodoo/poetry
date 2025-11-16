// File: R503EnrollmentService.ts
// Purpose: Handles fingerprint enrollment process. Captures
// images creates template stores in sensor slot.
// All Rights Reserved. Arodi Emmanuel

import { R503Protocol } from '../protocols/R503Protocol.js';
import { R503Command } from '../protocols/R503Commands.js';
import { R503CommandExecutor } from './R503CommandExecutor.js';
import { R503ImageCapture } from './R503ImageCapture.js';
import { logger } from '../logging/logger.js';

export class R503EnrollmentService {
  private imageCapture: R503ImageCapture;

  constructor(
    private executor: R503CommandExecutor,
    private protocol: R503Protocol
  ) {
    this.imageCapture = new R503ImageCapture(executor, protocol);
  }

  async enroll(templateId: number): Promise<boolean> {
    try {
      logger.info('Capturing first image');
      await this.imageCapture.captureToBuffer(1);

      logger.info('Waiting for finger removal');
      await this.executor.delay(2000);

      logger.info('Capturing second image');
      await this.imageCapture.captureToBuffer(2);

      logger.info('Creating template');
      await this.createTemplate();

      logger.info(`Storing in slot ${templateId}`);
      await this.storeTemplate(templateId);

      return true;
    } catch (error) {
      logger.error(`Enrollment failed: ${error}`);
      return false;
    }
  }

  private async createTemplate(): Promise<void> {
    const packet = this.protocol.buildPacket(
      R503Command.CREATE_TEMPLATE
    );
    const response = await this.executor.sendCommand(packet);

    if (!response.success) {
      throw new Error('Failed to create template');
    }
  }

  private async storeTemplate(templateId: number): Promise<void> {
    const packet = this.protocol.buildPacket(
      R503Command.STORE_TEMPLATE,
      [0x01, (templateId >> 8) & 0xff, templateId & 0xff]
    );

    const response = await this.executor.sendCommand(packet);

    if (!response.success) {
      throw new Error('Failed to store template');
    }
  }
}

