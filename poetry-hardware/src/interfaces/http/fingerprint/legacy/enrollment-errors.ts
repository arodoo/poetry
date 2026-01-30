// File: enrollment-errors.ts
// Purpose: Error code mappings for R503 fingerprint sensor.
// All Rights Reserved. Arodi Emmanuel

export function getErrorMessage(code: number): string {
    switch (code) {
        case 32:
            return 'Timeout: No finger detected. Please place your finger.';
        case 1:
            return 'Communication error with sensor';
        case 6:
            return 'Failed to generate character file';
        case 7:
            return 'Failed to generate template';
        default:
            return 'Enrollment failed';
    }
}
