// File: SerialRelayAdapter.ts
// Purpose: Real serial adapter for USB-TTL + relay
// All Rights Reserved. Arodi Emmanuel

import { SerialPort } from 'serialport';
import { RelayPort } from '../../application/ports/RelayPort.js';
import { RelayChannelId } from '../../domain/relay/RelayChannel.js';
import { logger } from '../logging/logger.js';

export class SerialRelayAdapter implements RelayPort {
  private port: SerialPort | null = null;
  private channelStates: Map<RelayChannelId, boolean>;

  constructor(private portPath: string) {
    this.channelStates = new Map([
      [1, false],
      [2, false],
      [3, false],
      [4, false],
    ]);
  }

  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.port = new SerialPort({
        path: this.portPath,
        baudRate: 9600,
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
      });

      this.port.on('open', () => {
        logger.info(`Serial port ${this.portPath} opened`);
        resolve();
      });

      this.port.on('error', (err) => {
        logger.error('Serial port error:', err);
        reject(err);
      });
    });
  }

  async turnOn(channelId: RelayChannelId): Promise<void> {
    const command = this.buildCommand(channelId, true);
    await this.sendCommand(command);
    this.channelStates.set(channelId, true);
    logger.info(`Channel ${channelId} turned ON`);
  }

  async turnOff(channelId: RelayChannelId): Promise<void> {
    const command = this.buildCommand(channelId, false);
    await this.sendCommand(command);
    this.channelStates.set(channelId, false);
    logger.info(`Channel ${channelId} turned OFF`);
  }

  async getStatus(channelId: RelayChannelId): Promise<boolean> {
    return this.channelStates.get(channelId) || false;
  }

  async close(): Promise<void> {
    return new Promise((resolve) => {
      if (this.port?.isOpen) {
        this.port.close(() => {
          logger.info('Serial port closed');
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  private buildCommand(
    channelId: RelayChannelId,
    state: boolean
  ): Buffer {
    const channelByte = 0x10 + channelId - 1;
    const stateByte = state ? 0x01 : 0x00;
    return Buffer.from([0xa0, channelByte, stateByte, 0x0f]);
  }

  private async sendCommand(command: Buffer): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.port?.isOpen) {
        reject(new Error('Serial port not open'));
        return;
      }

      this.port.write(command, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
