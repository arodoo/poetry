<!-- 
R503_INTEGRATION_GUIDE.md
Complete integration guide for R503 fingerprint sensor
Hardware setup, API usage, and frontend integration
All rights reserved © 2025
-->

# R503 Fingerprint Integration Guide

## Overview

The R503 fingerprint sensor is now fully integrated into the Poetry hardware service. This guide explains how to use it with the frontend wizard.

## Architecture

### Hardware Components
- **R503 Sensor**: 192x192 pixels, 1500 template capacity
- **USB-TTL Adapter**: FTDI FT232RL (second adapter, separate from relay)
- **Connection**: Serial UART at 57600 baud

### Software Layers

```
Frontend Wizard
    ↓
Backend /api/v1/fingerprints/enroll-for-user/{userId}
    ↓
Hardware Service /api/fingerprint/enroll
    ↓
R503 Sensor (physical hardware)
```

## API Endpoints

### 1. Enroll Fingerprint

```http
POST http://localhost:3001/api/fingerprint/enroll
Content-Type: application/json

{
  "slotId": 5
}
```

**Response (Success):**
```json
{
  "success": true,
  "slotId": 5,
  "message": "Fingerprint enrolled successfully"
}
```

**Process:**
1. Place finger on sensor
2. Sensor captures first image
3. Remove finger (2 second wait)
4. Place same finger again
5. Sensor captures second image
6. Creates template from both images
7. Stores template in specified slot

### 2. Verify Fingerprint

```http
POST http://localhost:3001/api/fingerprint/verify
```

**Response:**
```json
{
  "matched": true,
  "slotId": 5,
  "confidence": 98
}
```

### 3. Delete Template

```http
DELETE http://localhost:3001/api/fingerprint/template/5
```

### 4. Get Template Count

```http
GET http://localhost:3001/api/fingerprint/template-count
```

## Frontend Integration Flow

### Updated User Creation Wizard

**New Flow:**
1. User fills form (name, email, etc.)
2. **Wizard shows "Enroll Fingerprint" step**
3. Frontend calls hardware service enrollment endpoint
4. Hardware service guides user through enrollment:
   - "Place finger on sensor"
   - "Remove finger"
   - "Place finger again"
   - "Processing..."
5. On success, frontend calls backend to create user with slot ID
6. Backend stores user with assigned R503 slot

### Example Frontend Code

```typescript
// poetry-frontend/src/features/users/components/FingerprintEnrollmentStep.tsx

async function enrollFingerprint(slotId: number) {
  try {
    const response = await fetch('http://localhost:3001/api/fingerprint/enroll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slotId })
    });

    const result = await response.json();

    if (result.success) {
      console.log(`Enrolled in slot ${result.slotId}`);
      return result.slotId;
    } else {
      throw new Error('Enrollment failed');
    }
  } catch (error) {
    console.error('Enrollment error:', error);
    throw error;
  }
}
```

## Hardware Setup

### Requirements
- Second USB-TTL adapter (FTDI FT232RL)
- R503 fingerprint sensor
- Jumper wires (4: VCC, GND, TX, RX)

### Wiring

```
R503 Sensor          USB-TTL Adapter
-----------          ---------------
Red (VCC)    →       VCC (5V)
Black (GND)  →       GND
Yellow (RX)  →       TXD
Green (TX)   →       RXD
```

**Critical:** Cross TX/RX (sensor TX → adapter RX)

### Configuration

1. **Detect COM Port:**
   ```bash
   npm run detect:ports
   ```

2. **Update .env:**
   ```env
   FINGERPRINT_PORT=COM4  # Your detected port
   MOCK_MODE=false        # Enable real hardware
   ```

3. **Start Service:**
   ```bash
   npm run dev
   ```

## Testing

### Manual Test

```bash
# Enroll test
curl -X POST http://localhost:3001/api/fingerprint/enroll \
  -H "Content-Type: application/json" \
  -d '{"slotId": 1}'

# Verify test
curl -X POST http://localhost:3001/api/fingerprint/verify

# Count templates
curl http://localhost:3001/api/fingerprint/template-count
```

### Mock Mode (No Hardware)

For development without physical sensor:

```env
MOCK_MODE=true
```

Mock adapter simulates 2-second enrollment delay and returns success.

## Troubleshooting

### Issue: "Port not found"
**Solution:**
- Check USB connection
- Run `npm run detect:ports`
- Verify FINGERPRINT_PORT in .env

### Issue: "Timeout waiting for finger"
**Solution:**
- Ensure finger is firmly on sensor
- Check sensor power (5V)
- Verify TX/RX wiring (not reversed)

### Issue: "Enrollment failed"
**Solution:**
- Try different finger
- Clean sensor surface
- Ensure good contact during both captures

### Issue: Low confidence score
**Solution:**
- Re-enroll with better finger placement
- Clean sensor
- Ensure finger is dry

## Development Notes

### Code Structure

```
poetry-hardware/src/
├── infrastructure/
│   ├── protocols/
│   │   ├── R503Protocol.ts          # Main protocol facade
│   │   ├── R503Commands.ts          # Command/response codes
│   │   ├── R503PacketBuilder.ts     # Packet construction
│   │   └── R503PacketParser.ts      # Response parsing
│   └── adapters/
│       ├── SerialFingerprintAdapter.ts      # Main adapter
│       ├── R503PortInitializer.ts           # Port setup
│       ├── R503CommandExecutor.ts           # Command execution
│       ├── R503EnrollmentService.ts         # Enrollment logic
│       ├── R503VerificationService.ts       # Verification logic
│       ├── R503TemplateManager.ts           # Template management
│       └── R503ImageCapture.ts              # Image capture retry
└── interfaces/http/
    ├── FingerprintController.ts             # Main controller
    ├── FingerprintEnrollmentHandler.ts      # Enrollment endpoints
    └── FingerprintTemplateHandler.ts        # Template endpoints
```

### Protocol Details

- **Baud Rate:** 57600
- **Packet Format:** Header (0xEF01) + Address (4 bytes) + Type + Length + Command + Params + Checksum
- **Max Retries:** 10 attempts per image capture
- **Finger Removal Wait:** 2 seconds
- **Command Timeout:** 5 seconds

## Next Steps

1. **Frontend Integration:**
   - Add fingerprint enrollment step to user wizard
   - Show real-time feedback during enrollment
   - Handle errors gracefully

2. **Backend Integration:**
   - Update `/api/v1/fingerprints/enroll-for-user/{userId}` to call hardware service
   - Store R503 slot ID in user_fingerprints table
   - Map slot ID to user ID for verification

3. **Access Control:**
   - Use `/api/fingerprint/verify` in access control flow
   - On match, trigger relay to unlock door

## Security Considerations

- **Template Storage:** Templates stored on R503 sensor (not database)
- **Slot Assignment:** Backend manages slot allocation (1-1500)
- **Verification:** Hardware service returns slot ID, backend maps to user
- **Network:** Hardware service on localhost only (no external access)

## Performance

- **Enrollment Time:** ~6-8 seconds (2 captures + processing)
- **Verification Time:** ~1-2 seconds
- **False Acceptance Rate:** <0.001% (security level 3)
- **False Reject Rate:** <1.0% (security level 3)

---

**Status:** ✅ Ready for integration  
**Hardware Required:** R503 sensor + USB-TTL adapter  
**Mock Mode Available:** Yes (for development)  
**Documentation:** Complete
