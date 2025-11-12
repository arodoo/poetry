# Poetry Hardware Service

Hardware control service for Poetry project. Manages USB-TTL relay board and R503 fingerprint reader.

## Features

- 4-channel relay control via USB-TTL (FTDI FT232RL)
- R503 fingerprint reader support (enrollment, verification)
- REST API for hardware operations
- Mock mode for development without physical hardware
- Automated driver installation scripts
- COM port auto-detection

## Architecture

Follows DDD and Clean Architecture patterns:

- **Domain**: `RelayChannel`, `RelayBoard` models
- **Application**: Use cases and ports
- **Infrastructure**: Serial adapters (real + mock)
- **Interfaces**: REST API controllers

## Quick Start

### 1. Setup (First Time)

```bash
cd poetry-hardware
npm run setup:env
```

This will:

- Check Node.js installation
- Install npm dependencies
- Create `.env` from template
- Optionally install FTDI drivers

### 2. Detect COM Ports

```bash
npm run detect:ports
```

Update `.env` with detected ports:

```
USB_TTL_PORT=COM3
FINGERPRINT_PORT=COM4
```

### 3. Run in Mock Mode (No Hardware)

```bash
npm run dev
```

Service starts at `http://localhost:3001`

### 4. Test API

```bash
curl http://localhost:3001/health
curl -X POST http://localhost:3001/api/relay/channel/1/on
curl http://localhost:3001/api/relay/status
```

### 5. Switch to Real Hardware

Edit `.env`:

```
MOCK_MODE=false
USB_TTL_PORT=COM3
```

Restart service.

## API Endpoints

### Health Check

```
GET /health
```

### Relay Control

```
POST /api/relay/channel/:id/on    # id: 1-4
POST /api/relay/channel/:id/off
GET  /api/relay/status
```

## Hardware Connections

### USB-TTL to Relay Board

```
USB-TTL (FT232RL)  →  Relay Board (SRD-05VDC-SL-C)
-------------------------------------------------
VCC (5V)           →  VCC
GND                →  GND
TXD                →  (not used)
RXD                →  (not used)
```

**Important**:

- Relay operates on 5V
- Max current per channel: 10A
- Channels: IN1, IN2, IN3, IN4

### R503 Fingerprint Reader

```
R503 Wires         →  USB-TTL (Second adapter)
-------------------------------------------------
Red (VCC)          →  VCC (3.3V or 5V)
Black (GND)        →  GND
Yellow (RX)        →  TXD
Green (TX)         →  RXD
White (WAKEUP)     →  (optional)
Blue (TOUCH)       →  (optional)
```

## Troubleshooting

### No COM Ports Detected

1. Ensure USB-TTL is connected
2. Install FTDI drivers: `npm run setup:drivers`
3. Check Device Manager (Windows)

### Service Won't Start

1. Check `.env` configuration
2. Verify COM port not in use
3. Check logs: `logs/hardware/hardware-dev.log`

### Relay Not Responding

1. Check connections (VCC, GND)
2. Verify power supply (5V)
3. Test in mock mode first

## Development

### Run Tests

```bash
npm test
```

### Typecheck

```bash
npm run typecheck
```

### Lint

```bash
npm run lint
```

## Next Steps (When Hardware Arrives)

1. Connect USB-TTL + Relay
2. Run `npm run detect:ports`
3. Set `MOCK_MODE=false`
4. Test relay channels
5. When R503 arrives, connect second serial port
6. Implement R503 protocol in `SerialFingerprintAdapter.ts`

## Integration with Backend

Backend Java service will consume this API:

```java
// Example: Open door via relay
RestTemplate restTemplate = new RestTemplate();
String url = "http://localhost:3001/api/relay/channel/1/on";
restTemplate.postForEntity(url, null, Void.class);
```

Full integration guide: See `docs/hardware-backend-integration.md`
