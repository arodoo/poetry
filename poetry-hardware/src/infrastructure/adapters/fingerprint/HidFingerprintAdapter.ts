// File: HidFingerprintAdapter.ts
// Purpose: Adapter for HID Digital Persona U.are.U fingerprint readers.
// Uses native FingerprintCapture.exe for capture and FMD extraction.
// All Rights Reserved. Arodi Emmanuel

import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import {
    FingerprintPort,
    EnrollResult,
    VerifyResult,
} from '../../../application/ports/FingerprintPort.js';
import { BatchDeleteResult } from '../../../application/ports/BatchDeleteResult.js';
import { logger } from '../../logging/logger.js';

const execAsync = promisify(exec);

interface CaptureResult {
    success: boolean;
    fmd?: string;
    quality?: string;
    error?: string;
}

export class HidFingerprintAdapter implements FingerprintPort {
    private initialized = false;
    private exePath: string;

    constructor() {
        this.exePath = path.join(
            __dirname,
            '../../../../native/fingerprint-bridge/bin/Release/net472',
            'FingerprintCapture.exe'
        );
    }

    async initialize(): Promise<void> {
        if (this.initialized) return;

        try {
            const { stdout } = await execAsync(`"${this.exePath}" list`);
            const result = JSON.parse(stdout) as { success: boolean; count: number };

            if (result.success && result.count > 0) {
                logger.info(`[HID] Initialized: ${result.count} reader(s)`);
                this.initialized = true;
            } else {
                throw new Error('No HID readers found');
            }
        } catch (err) {
            logger.error('[HID] Initialization failed:', err);
            throw err;
        }
    }

    async enroll(_templateId: number): Promise<EnrollResult> {
        this.ensureInitialized();
        const fmd = await this.captureFmd();
        return { templateId: 0, success: fmd !== null };
    }

    async verify(): Promise<VerifyResult> {
        this.ensureInitialized();
        const fmd = await this.captureFmd();
        if (!fmd) {
            return { matched: false, templateId: null, confidence: 0 };
        }
        return { matched: false, templateId: null, confidence: 0, fmd };
    }

    async deleteTemplate(_templateId: number): Promise<boolean> {
        logger.info('[HID] deleteTemplate no-op (server-side storage)');
        return true;
    }

    async deleteTemplates(_slotIds: number[]): Promise<BatchDeleteResult> {
        return { successfulSlots: [], failedSlots: [], totalRequested: 0 };
    }

    async getTemplateCount(): Promise<number> {
        return 0;
    }

    async findAvailableSlot(): Promise<number> {
        return 0;
    }

    async downloadTemplate(_slotId: number): Promise<Buffer | null> {
        return null;
    }

    async uploadTemplate(_slotId: number, _template: Buffer): Promise<boolean> {
        return false;
    }

    async close(): Promise<void> {
        this.initialized = false;
        logger.info('[HID] Adapter closed');
    }

    private ensureInitialized(): void {
        if (!this.initialized) {
            throw new Error('HID reader not initialized');
        }
    }

    private async captureFmd(): Promise<string | null> {
        try {
            logger.info('[HID] Capturing fingerprint...');

            const { stdout, stderr } = await execAsync(
                `"${this.exePath}" capture`,
                { timeout: 30000 }
            );

            if (stderr) logger.info(`[HID] ${stderr.trim()}`);

            const result = JSON.parse(stdout) as CaptureResult;
            if (result.success && result.fmd) {
                logger.info(`[HID] Capture OK, quality: ${result.quality}`);
                return result.fmd;
            }

            logger.warn(`[HID] Capture failed: ${result.error}`);
            return null;
        } catch (err) {
            logger.error('[HID] Capture error:', err);
            return null;
        }
    }
}
