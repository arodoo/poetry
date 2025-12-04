// File: R503CommandExecutor.ts
// Purpose: Executes individual R503 commands and handles
// protocol-level communication with the sensor.
// All Rights Reserved. Arodi Emmanuel

import { SerialPort } from 'serialport';
import { R503Protocol } from '../../protocols/R503Protocol.js';

export class R503CommandExecutor {
  constructor(
    private port: SerialPort,
    private protocol: R503Protocol
  ) {}

  async sendCommand(packet: Buffer): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.port.isOpen) {
        reject(new Error('Port not open'));
        return;
      }

      this.port.write(packet, (writeErr) => {
        if (writeErr) {
          reject(writeErr);
          return;
        }
      });

      const timeout = setTimeout(() => {
        reject(new Error('Command timeout'));
      }, 5000);

      const responseBuffer: Buffer[] = [];

      const dataHandler = (data: Buffer) => {
        responseBuffer.push(data);
        const fullBuffer = Buffer.concat(responseBuffer);

        if (fullBuffer.length >= 12) {
          clearTimeout(timeout);
          this.port.removeListener('data', dataHandler);

          try {
            const response = this.protocol.parseResponse(fullBuffer);
            resolve(response);
          } catch (error) {
            reject(error);
          }
        }
      };

      this.port.on('data', dataHandler);
    });
  }

  delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
