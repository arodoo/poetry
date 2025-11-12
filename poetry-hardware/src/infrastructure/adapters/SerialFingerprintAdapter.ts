// File: SerialFingerprintAdapter.ts
// Purpose: Real R503 fingerprint adapter (placeholder)
// All Rights Reserved. Arodi Emmanuel

import { SerialPort } from 'serialport';
import {
  FingerprintPort,
  EnrollResult,
  VerifyResult,
} from '../../application/ports/FingerprintPort.js';
import { logger } from '../logging/logger.js';

export class SerialFingerprintAdapter implements FingerprintPort {
  private port: SerialPort | null = null;

  constructor(private portPath: string) {}

  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.port = new SerialPort({
        path: this.portPath,
        baudRate: 57600,
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
      });

      this.port.on('open', () => {
        logger.info(`Fingerprint port ${this.portPath} opened`);
        resolve();
      });

      this.port.on('error', (err) => {
        logger.error('Fingerprint port error:', err);
        reject(err);
      });
    });
  }

  async enroll(templateId: number): Promise<EnrollResult> {
    logger.info(`Enrolling fingerprint ${templateId}...`);
    throw new Error('R503 implementation pending');
  }

  async verify(): Promise<VerifyResult> {
    logger.info('Verifying fingerprint...');
    throw new Error('R503 implementation pending');
  }

  async deleteTemplate(templateId: number): Promise<boolean> {
    logger.info(`Deleting template ${templateId}...`);
    throw new Error('R503 implementation pending');
  }

  async getTemplateCount(): Promise<number> {
    throw new Error('R503 implementation pending');
  }

  async close(): Promise<void> {
    return new Promise((resolve) => {
      if (this.port?.isOpen) {
        this.port.close(() => {
          logger.info('Fingerprint port closed');
          resolve();
        });
      } else {
        resolve();
      }
    });
  }
}
