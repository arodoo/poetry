// File: R503TemplateManager.ts
// Purpose: Manages fingerprint templates in R503 sensor.
// Handles delete and count operations.
// All Rights Reserved. Arodi Emmanuel

import { R503Protocol } from '../protocols/R503Protocol.js';
import { R503Command } from '../protocols/R503Commands.js';
import { R503CommandExecutor } from './R503CommandExecutor.js';
import { logger } from '../logging/logger.js';

export class R503TemplateManager {
  constructor(
    private executor: R503CommandExecutor,
    private protocol: R503Protocol
  ) {}

  async deleteTemplate(templateId: number): Promise<boolean> {
    logger.info(`Deleting template ${templateId}`);

    try {
      const packet = this.protocol.buildPacket(R503Command.DELETE, [
        (templateId >> 8) & 0xff,
        templateId & 0xff,
        0x00,
        0x01,
      ]);

      const response = await this.executor.sendCommand(packet);
      return response.success;
    } catch (error) {
      logger.error(`Delete failed: ${error}`);
      return false;
    }
  }

  async getTemplateCount(): Promise<number> {
    try {
      const packet = this.protocol.buildPacket(
        R503Command.TEMPLATE_COUNT
      );
      const response = await this.executor.sendCommand(packet);

      if (response.success) {
        return (response.data[0] << 8) | response.data[1];
      }
      return 0;
    } catch (error) {
      logger.error(`Get count failed: ${error}`);
      return 0;
    }
  }
}
