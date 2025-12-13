// File: BridgeHttpClient.ts
// Purpose: HTTP client for fingerprint-bridge communication.
// Handles all REST calls to the 32-bit bridge service on port 3001.
// All Rights Reserved. Arodi Emmanuel


const BRIDGE_URL =
  process.env.FINGERPRINT_BRIDGE_URL || 'http://localhost:3001';

export interface BridgeResponse {
  success?: boolean;
  code?: number;
  id?: number;
  score?: number;
  template?: string;
  slotId?: number;
  count?: number;
}

export async function checkBridgeHealth(): Promise<void> {
  const response = await fetch(`${BRIDGE_URL}/health`);
  if (!response.ok) {
    throw new Error(`Bridge health check failed: ${response.status}`);
  }
}

export async function openDevice(): Promise<BridgeResponse> {
  const response = await fetch(`${BRIDGE_URL}/device/open`, {
    method: 'POST',
  });
  return response.json() as Promise<BridgeResponse>;
}

export async function closeDevice(): Promise<void> {
  await fetch(`${BRIDGE_URL}/device/close`, { method: 'POST' });
}

export async function enrollFingerprint(
  templateId: number
): Promise<BridgeResponse> {
  const response = await fetch(`${BRIDGE_URL}/fingerprint/enroll`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: templateId }),
  });
  return response.json() as Promise<BridgeResponse>;
}

export async function identifyFingerprint(): Promise<BridgeResponse> {
  const response = await fetch(`${BRIDGE_URL}/fingerprint/identify`, {
    method: 'POST',
  });
  return response.json() as Promise<BridgeResponse>;
}

export async function downloadTemplate(
  slotId: number
): Promise<BridgeResponse> {
  const response = await fetch(
    `${BRIDGE_URL}/fingerprint/template/${slotId}`
  );
  return response.json() as Promise<BridgeResponse>;
}

export async function uploadTemplate(
  slotId: number,
  template: Buffer
): Promise<BridgeResponse> {
  const response = await fetch(
    `${BRIDGE_URL}/fingerprint/template`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slotId,
        template: template.toString('base64'),
      }),
    }
  );
  return response.json() as Promise<BridgeResponse>;
}

export async function deleteTemplateFromDevice(
  slotId: number
): Promise<boolean> {
  const response = await fetch(
    `${BRIDGE_URL}/fingerprint/template/${slotId}`,
    { method: 'DELETE' }
  );
  const data = (await response.json()) as BridgeResponse;
  return data.success === true || data.code === 0;
}

export async function getAvailableSlot(): Promise<BridgeResponse> {
  const response = await fetch(`${BRIDGE_URL}/fingerprint/available-slot`);
  return response.json() as Promise<BridgeResponse>;
}

export async function getTemplateCount(): Promise<BridgeResponse> {
  const response = await fetch(`${BRIDGE_URL}/fingerprint/template-count`);
  return response.json() as Promise<BridgeResponse>;
}
