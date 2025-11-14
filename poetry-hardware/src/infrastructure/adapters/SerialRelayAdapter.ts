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
  private initialized = false;

  constructor(private portPath: string) {
    this.channelStates = new Map([
      [1, false],
      [2, false],
      [3, false],
      [4, false],
    ]);
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  async initialize(): Promise<void> {
    if (this.initialized) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      this.port = new SerialPort({
        path: this.portPath,
        baudRate: 9600,
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
      });

      this.port.on('open', async () => {
        logger.info(`Serial port ${this.portPath} opened`);

        await this.port!.set({ rts: false, dtr: false });
        logger.info('RTS/DTR initialized to LOW (relays OFF)');

        this.initialized = true;
        resolve();
      });

      this.port.on('error', (err) => {
        logger.error('Serial port error:', err);
        reject(err);
      });
    });
  }

  async turnOn(channelId: RelayChannelId): Promise<void> {
    if (!this.port?.isOpen) {
      throw new Error('Serial port not open');
    }

    if (channelId === 1) {
      await this.port.set({ rts: true });
    } else if (channelId === 2) {
      await this.port.set({ dtr: true });
    } else {
      logger.warn(
        `Channel ${channelId} not available with GPIO control`
      );
      throw new Error(
        `Only channels 1-2 available with current hardware`
      );
    }

    this.channelStates.set(channelId, true);
    logger.info(`Channel ${channelId} turned ON (RTS/DTR HIGH)`);
  }

  async turnOff(channelId: RelayChannelId): Promise<void> {
    if (!this.port?.isOpen) {
      throw new Error('Serial port not open');
    }

    if (channelId === 1) {
      await this.port.set({ rts: false });
    } else if (channelId === 2) {
      await this.port.set({ dtr: false });
    } else {
      logger.warn(
        `Channel ${channelId} not available with GPIO control`
      );
      throw new Error(
        `Only channels 1-2 available with current hardware`
      );
    }

    this.channelStates.set(channelId, false);
    logger.info(`Channel ${channelId} turned OFF (RTS/DTR LOW)`);
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
}
