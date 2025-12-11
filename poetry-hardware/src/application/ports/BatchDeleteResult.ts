// File: BatchDeleteResult.ts
// Purpose: Result type for batch template deletion operations.
// Contains successful and failed slot IDs with error details.
// All Rights Reserved. Arodi Emmanuel

export interface SlotError {
    readonly slotId: number;
    readonly error: string;
}

export interface BatchDeleteResult {
    readonly successfulSlots: number[];
    readonly failedSlots: SlotError[];
    readonly totalRequested: number;
}

export function createBatchResult(
    successful: number[],
    failed: SlotError[],
    total: number
): BatchDeleteResult {
    return {
        successfulSlots: successful,
        failedSlots: failed,
        totalRequested: total,
    };
}
