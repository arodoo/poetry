// File: R503PortInitializer.ts
// Purpose: Initializes serial port connection to R503 sensor
// and creates service instances for operations.
// All Rights Reserved. Arodi Emmanuel

import { SerialPort } from 'serialport';
import { R503Protocol } from '../protocols/R503Protocol.js';
import { R503CommandExecutor } from './R503CommandExecutor.js';
import { R503EnrollmentService } from './R503EnrollmentService.js';
import { R503VerificationService } from './R503VerificationService.js';
import { R503TemplateManager } from './R503TemplateManager.js';
import { logger } from '../logging/logger.js';

export interface R503Services {
  executor: R503CommandExecutor;
  enrollment: R503EnrollmentService;
  verification: R503VerificationService;
  templateManager: R503TemplateManager;
}

export class R503PortInitializer {
  constructor(
    private portPath: string,
    private protocol: R503Protocol
  ) {}

  async initialize(): Promise<{
    port: SerialPort;
    services: R503Services;
  }> {
    return new Promise((resolve, reject) => {
      const port = new SerialPort({
        path: this.portPath,
        baudRate: 57600,
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
      });

      port.on('open', () => {
        logger.info(`Fingerprint port ${this.portPath} opened`);

        const executor = new R503CommandExecutor(port, this.protocol);
        const enrollment = new R503EnrollmentService(
          executor,
          this.protocol
        );
        const verification = new R503VerificationService(
          executor,
          this.protocol
        );
        const templateManager = new R503TemplateManager(
          executor,
          this.protocol
        );

        resolve({
          port,
          services: { executor, enrollment, verification, templateManager },
        });
      });

      port.on('error', (err) => {
        logger.error('Fingerprint port error:', err);
        reject(err);
      });
    });
  }
}
