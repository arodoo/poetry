<!-- 
QUICK_START.md
Quick reference guide for hardware service development and operation.
Contains startup commands, testing procedures, and troubleshooting steps.
All rights reserved © 2025
-->

# Poetry Hardware Service - Quick Start Guide

## Service Startup

### Start Hardware Service
```bash
cd poetry-hardware
npm run dev
```

Service runs on **http://localhost:3001** with hot-reload enabled.

### Stop Service
Press `Ctrl+C` in the terminal running the service.

### Port Locked Issue
If you see "Access denied" on COM3:
```bash
taskkill //F //IM node.exe
npm run dev
```

## Testing Relay Control

### Channel 1 (Connected to RTS pin)

**Turn ON (energize relay, LED lights up):**
```bash
curl -X POST http://localhost:3001/api/relay/channel/1/on
```
Expected: Click sound + LED ON

**Turn OFF (de-energize relay, LED turns off):**
```bash
curl -X POST http://localhost:3001/api/relay/channel/1/off
```
Expected: Click sound + LED OFF

**Check Status:**
```bash
curl http://localhost:3001/api/relay/status
```

**Health Check:**
```bash
curl http://localhost:3001/health
```

## Hardware Configuration

### Current Wiring (Verified Working)
- **BLANCO (GND relay)** → **GND adapter** (fila 1, pin 2)
- **ROJO (VCC relay)** → **5V adapter** (fila 2, pin 1)
- **NARANJA (IN1 relay)** → **RTS adapter** (fila 1, pin 5)

### Active Channels
- **Channel 1**: RTS pin (working)
- **Channel 2**: DTR pin (ready, needs physical connection)
- **Channels 3-4**: Require GPIO expander (PCF8574 or Arduino)

### Relay Logic
SRD-05VDC-SL-C uses **active-LOW** triggering:
- IN pin **HIGH (5V)** = Relay OFF
- IN pin **LOW (0V)** = Relay ON (energized)

## Environment Configuration

### .env File Location
`poetry-hardware/.env`

### Key Settings
```env
MOCK_MODE=false          # Use real hardware
USB_TTL_PORT=COM3        # Detected FTDI port
PORT=3001                # API server port
LOG_LEVEL=debug          # Logging verbosity
RELAY_CHANNELS=4         # Total relay channels
```

### Auto-Detect COM Port
```bash
cd poetry-hardware
npm run detect:ports
```
This updates `.env` automatically with detected port.

## Development Workflow

### 1. Check Hardware Connection
```bash
npm run detect:ports
```
Verify COM3 is detected and `.env` is updated.

### 2. Start Service
```bash
npm run dev
```

### 3. Test API
```bash
curl http://localhost:3001/health
curl -X POST http://localhost:3001/api/relay/channel/1/on
curl -X POST http://localhost:3001/api/relay/channel/1/off
```

### 4. Run Tests
```bash
npm test
```

## Mock Mode (Development Without Hardware)

### Switch to Mock Mode
Edit `.env`:
```env
MOCK_MODE=true
```

Restart service. Mock adapter simulates relay without COM port.

### Switch Back to Real Hardware
```bash
npm run detect:ports  # Auto-updates .env
npm run dev
```

## Logs

### Console Logs
Visible in terminal running `npm run dev`.

### File Logs
`logs/hardware/hardware-dev.log`

### Log Levels
- `error`: Critical failures only
- `info`: Standard operation info (default)
- `debug`: Detailed serial communication

Change in `.env`: `LOG_LEVEL=debug`

## Common Issues

### Issue: "Access denied" on COM3
**Cause:** Previous Node process still holding port.
**Fix:**
```bash
taskkill //F //IM node.exe
npm run dev
```

### Issue: Relay doesn't respond
**Check:**
1. Service logs show "Serial port COM3 opened"
2. `.env` has `MOCK_MODE=false`
3. Wiring matches HARDWARE_CONNECTIONS.md
4. Health endpoint returns `"mode":"real"`

### Issue: ON/OFF reversed
**Verified Fixed:** Active-LOW logic implemented correctly.
- `turnOn()` sets RTS HIGH (energizes relay)
- `turnOff()` sets RTS LOW (de-energizes relay)

### Issue: COM port not detected
**Fix:**
```bash
# Re-run driver installation
cd poetry-hardware/scripts
powershell -ExecutionPolicy Bypass -File install-drivers.ps1

# Re-detect port
cd ..
npm run detect:ports
```

## Backend Integration (Java/Spring)

### Start Backend
```bash
cd poetry-backend
./mvnw spring-boot:run
```

### Hardware Client Example
See `docs/integration-examples/HardwareClient.java`

### Usage in Backend
```java
@Autowired
private HardwareClient hardwareClient;

public void unlockDoor() {
    hardwareClient.activateRelayChannel(1);
    // Wait 3 seconds
    hardwareClient.deactivateRelayChannel(1);
}
```

## Next Steps

### Channel 2 (DTR Pin)
1. Connect **VERDE (IN2 relay)** → **CTS adapter** (fila 1, pin 6)
2. Test with channel 2 endpoints

### Channels 3-4 Expansion
Options:
- **PCF8574 I2C GPIO Expander** (~$2 USD)
- **Arduino Nano** as USB-relay bridge (more robust)

### R503 Fingerprint Reader
Hardware pending delivery. Code skeleton ready:
- `src/domain/fingerprint/`
- `src/infrastructure/adapters/MockFingerprintAdapter.ts`

## Scripts Reference

```bash
npm run dev              # Start service (hot-reload)
npm run build            # Compile TypeScript
npm run start            # Run compiled JS
npm test                 # Run all tests
npm run detect:ports     # Auto-detect COM port
npm run setup:drivers    # Install FTDI drivers (admin)
npm run setup:env        # Complete environment setup
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Service health check |
| GET | `/api/relay/status` | All channels status |
| POST | `/api/relay/channel/:id/on` | Activate channel |
| POST | `/api/relay/channel/:id/off` | Deactivate channel |

Replace `:id` with 1-4.

## Verification Checklist

Before considering relay integration complete:

- [x] Service starts without errors
- [x] COM3 detected automatically
- [x] Channel 1 ON activates relay (click + LED)
- [x] Channel 1 OFF deactivates relay (click + LED off)
- [x] API returns correct success responses
- [x] Logs show serial port opened
- [ ] Channel 2 physically connected and tested
- [ ] Backend Java integration implemented
- [ ] R503 fingerprint reader integrated
- [ ] Production deployment configured

---

**Last Updated:** November 13, 2025  
**Status:** Channel 1 fully operational, active-LOW logic verified working  
**Hardware:** DSD TECH FT232RL + Tecneu 4-channel relay SRD-05VDC-SL-C
