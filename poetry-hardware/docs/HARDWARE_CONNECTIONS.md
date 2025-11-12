# Hardware Connection Guide

Detailed physical connection instructions.

## Components

1. **DSD TECH USB-TTL Adapter (FT232RL)**
   - Model: SH-U09C
   - Pins: VCC, GND, TXD, RXD, RTS, CTS
   - Output: 5V/3.3V selectable
   - Baud: Up to 3 Mbps

2. **4-Channel Relay Board (SRD-05VDC-SL-C)**
   - Channels: 4
   - Voltage: 5V
   - Max current: 10A per channel
   - Control: Low-level trigger

3. **R503 Fingerprint Reader**
   - Communication: UART/Serial
   - Baud rate: 57600
   - Voltage: 3.3V or 5V

## Wiring Diagrams

### Setup 1: USB-TTL → Relay (Control)

```
┌─────────────────┐          ┌──────────────────┐
│  USB-TTL (PC)   │          │   Relay Board    │
│                 │          │                  │
│  VCC (5V)   ────┼──────────┼──→ VCC           │
│  GND        ────┼──────────┼──→ GND           │
│  TXD        ────┼──────────┼──→ IN1/IN2/...   │
│  (USB to PC) ───┼──────────┼──  (via logic)   │
└─────────────────┘          └──────────────────┘
```

**Pin Connections:**

- USB-TTL VCC → Relay VCC (5V)
- USB-TTL GND → Relay GND
- Control via serial commands (no direct GPIO)

**Note**: This relay uses serial control, not direct GPIO.

### Setup 2: R503 → USB-TTL (Second Adapter)

```
┌─────────────────┐          ┌──────────────────┐
│  R503 Reader    │          │  USB-TTL (PC)    │
│                 │          │                  │
│  Red (VCC)  ────┼──────────┼──→ VCC (3.3/5V)  │
│  Black (GND)────┼──────────┼──→ GND           │
│  Yellow (RX)────┼──────────┼──→ TXD           │
│  Green (TX) ────┼──────────┼──→ RXD           │
│  White (WAKE)───┼──────────┼──  (optional)    │
│  Blue (TOUCH)───┼──────────┼──  (optional)    │
└─────────────────┘          └──────────────────┘
```

**Critical**: Cross TX/RX (Reader TX → Adapter RX)

## Step-by-Step Connection

### Phase 1: Relay Only

1. **Install FTDI Drivers**

   ```bash
   npm run setup:drivers
   ```

2. **Connect USB-TTL to PC**
   - Plug into USB port
   - Wait for Windows driver installation
   - Verify in Device Manager → Ports (COM & LPT)

3. **Detect COM Port**

   ```bash
   npm run detect:ports
   ```

   Should show: `COM3` (example)

4. **Connect Relay to USB-TTL**
   - USB-TTL VCC → Relay VCC
   - USB-TTL GND → Relay GND

5. **Power On**
   - Relay board LED should light up
   - No smoke = good!

6. **Test in Mock Mode First**

   ```bash
   # .env: MOCK_MODE=true
   npm run dev
   curl -X POST http://localhost:3001/api/relay/channel/1/on
   ```

7. **Switch to Real Mode**
   ```bash
   # .env: MOCK_MODE=false, USB_TTL_PORT=COM3
   npm run dev
   ```

### Phase 2: Add R503 (When It Arrives)

1. **Connect Second USB-TTL**
   - Need 2 adapters total (1 for relay, 1 for R503)
   - Alternative: Use Raspberry Pi GPIO

2. **Wire R503**
   - Follow diagram above
   - **Important**: Check voltage (3.3V vs 5V)

3. **Detect Second Port**

   ```bash
   npm run detect:ports
   ```

   Should show 2 COM ports

4. **Update .env**

   ```
   USB_TTL_PORT=COM3
   FINGERPRINT_PORT=COM4
   ```

5. **Test Fingerprint**
   ```bash
   curl -X POST http://localhost:3001/api/fingerprint/enroll \
     -H "Content-Type: application/json" \
     -d '{"templateId": 1}'
   ```

## Safety Checklist

- [ ] Voltage is correct (5V for relay, check R503 spec)
- [ ] Polarity correct (VCC/GND not reversed)
- [ ] No loose connections
- [ ] USB-TTL not overloaded (max 500mA @ 5V)
- [ ] Relay channels not exceeding 10A
- [ ] Test in mock mode before real hardware

## Common Issues

**Issue**: Device not detected

- **Fix**: Reinstall drivers, try different USB port

**Issue**: Relay not responding

- **Fix**: Check GND connection, verify baud rate (9600)

**Issue**: R503 not reading

- **Fix**: Check TX/RX crossover, verify voltage

**Issue**: "Port in use" error

- **Fix**: Close other serial monitors, restart service

## Testing Strategy

1. **Mock mode**: Validate API logic
2. **Relay only**: Test serial communication
3. **R503 only**: Test fingerprint protocol
4. **Full integration**: Backend → Hardware → Physical action

## Next: Backend Integration

See `docs/hardware-backend-integration.md` for Java client code.
