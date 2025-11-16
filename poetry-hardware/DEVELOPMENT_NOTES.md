<!-- 
DEVELOPMENT_NOTES.md
Development history, troubleshooting insights, and technical decisions.
Documents lessons learned during hardware integration process.
All rights reserved © 2025
-->

# Development Notes - Hardware Service

## Implementation History

### Phase 1: Architecture Decision
**Date:** November 2025  
**Decision:** Node.js/TypeScript service instead of Java integration  
**Rationale:**
- SerialPort library mature and well-documented for Node.js
- Separation of concerns (hardware abstraction layer)
- Can evolve independently from Spring backend
- Easier testing with mock adapters

### Phase 2: Protocol Discovery
**Initial Assumption:** Relay uses UART command protocol  
**Reality:** SRD-05VDC-SL-C uses GPIO TTL level control  

**Discovery Process:**
1. Implemented `buildCommand()` with Buffer protocol → No response
2. Tested UART commands (0xA0, 0x01, 0x01, 0xA2) → No response
3. Analyzed hardware specs → Found "TTL Level Control" mention
4. Switched to `SerialPort.set({rts, dtr})` GPIO control → SUCCESS

**Lesson:** Generic relay modules use various protocols. Always verify:
- Manufacturer datasheet
- Community forums for specific model
- Physical testing with multimeter

### Phase 3: Logic Inversion Discovery
**Symptom:** ON command worked, OFF command kept LED lit  
**Root Cause:** Active-LOW relay triggering (optocoupler design)  

**Physical Behavior:**
- IN pin HIGH (5V) = Optocoupler OFF = Relay coil de-energized
- IN pin LOW (0V) = Optocoupler ON = Relay coil energized

**Fix:** Inverted turnOn/turnOff GPIO values:
```typescript
// turnOn: Set RTS HIGH to energize relay
await this.port.set({ rts: true });

// turnOff: Set RTS LOW to de-energize relay  
await this.port.set({ rts: false });
```

### Phase 4: Port Detection Challenges
**Issue:** `Get-WmiObject Win32_SerialPort` returned empty on Windows 11  
**Solution:** Multi-method fallback detection:

1. **Registry Query** (Primary, most reliable):
   ```powershell
   Get-ItemProperty HKLM:\HARDWARE\DEVICEMAP\SERIALCOMM
   ```

2. **WMI Win32_SerialPort** (Secondary):
   ```powershell
   Get-WmiObject Win32_SerialPort
   ```

3. **PnP Device Enumeration** (Tertiary):
   ```powershell
   Get-PnpDevice -Class Ports
   ```

**FTDI Identification:** Look for `VID_0403` in PNPDeviceID (Vendor ID 0403)

## Technical Constraints

### FT232RL GPIO Limitations
**Available Pins:** 
- RTS (Request To Send) - Channel 1
- DTR (Data Terminal Ready) - Channel 2

**Unavailable for GPIO:**
- TXD/RXD (reserved for UART communication)
- CTS (input only, cannot drive relay)

**Implication:** Maximum 2 relay channels without expansion hardware.

### Expansion Options for 4 Channels

#### Option A: PCF8574 I2C GPIO Expander
**Pros:**
- Cheap (~$2 USD)
- 8 GPIO pins (supports all 4 relay channels)
- I2C communication via TXD/RXD

**Cons:**
- Requires additional library (i2c-bus or serialport-i2c)
- More complex wiring
- I2C address configuration needed

#### Option B: Arduino/ESP32 Bridge
**Pros:**
- More flexible (can add logic, timers, safety checks)
- Easier debugging (Serial monitor)
- Can handle multiple hardware modules

**Cons:**
- Higher cost (~$8-15 USD)
- Requires firmware development
- Additional USB port consumption

**Recommendation:** Arduino Nano for production (reliability), PCF8574 for prototype.

## Code Architecture Decisions

### DDD Layer Separation
```
domain/          → Business logic (RelayBoard, RelayChannel)
application/     → Use cases (ActivateRelayUseCase)
infrastructure/  → External dependencies (SerialRelayAdapter)
interfaces/      → HTTP controllers and routes
```

**Benefit:** Can swap serial adapter for I2C/GPIO/SPI without changing domain.

### Mock Adapter Pattern
**Purpose:** Development without physical hardware  
**Implementation:** MockRelayAdapter simulates delays and state changes  
**Activation:** `.env` setting `MOCK_MODE=true`

**Use Cases:**
- Frontend development before hardware arrives
- CI/CD testing without physical setup
- Unit testing without serial port access

### Dependency Injection (composition.ts)
**Pattern:** Manual DI container (no framework overhead)  
**Benefits:**
- Testable (inject mock adapters)
- Configurable (switch real/mock via env)
- Clear dependencies (explicit constructor params)

## Replicability Requirements

### User Requirement
> "necesito instalar en el pc. este software debe ser replicable"

### Implementation Strategy

1. **Automated Driver Installation:**
   ```bash
   npm run setup:drivers
   ```
   PowerShell script downloads and installs FTDI drivers silently.

2. **Auto-Detection and Configuration:**
   ```bash
   npm run detect:ports
   ```
   Script detects COM port and updates `.env` automatically.

3. **Single-Command Setup:**
   ```bash
   npm run setup:env
   ```
   Orchestrates drivers + detection + environment validation.

4. **Zero Manual Configuration:**
   - No hardcoded COM ports (auto-detected)
   - No manual .env editing (script-updated)
   - No driver hunting (automated download)

### Deployment Checklist for New PC

1. Install Node.js 20+ (prerequisite)
2. Clone repository
3. Run `npm install` in poetry-hardware/
4. Connect USB-TTL adapter
5. Run `npm run setup:env` (admin PowerShell)
6. Run `npm run dev`
7. Test with curl commands

**Time to First Relay Click:** ~5 minutes on fresh Windows 11 install.

## Testing Insights

### Physical Testing Protocol
1. **Visual Inspection:** LED state change
2. **Auditory Confirmation:** Relay click sound
3. **API Response:** JSON success/failure
4. **Log Verification:** Serial port state changes

### Test Data Validation
```bash
# ON Test
curl -X POST http://localhost:3001/api/relay/channel/1/on
# Expected: {"success":true,"channelId":1,"state":"active"}
# Physical: Click + LED ON

# OFF Test  
curl -X POST http://localhost:3001/api/relay/channel/1/off
# Expected: {"success":true,"channelId":1,"state":"inactive"}
# Physical: Click + LED OFF
```

### Common Test Failures

| Symptom | Cause | Fix |
|---------|-------|-----|
| No click, no LED | Wiring error | Check GND and VCC connections |
| Click but no LED | LED polarity reversed | Irrelevant (relay still works) |
| LED stays on | Logic inversion | Verify active-LOW implementation |
| API timeout | Port locked | Kill Node.js processes |
| "Port not found" | Driver missing | Run setup:drivers script |

## Power Considerations

### Relay Power Requirements
- **Coil Voltage:** 5V DC
- **Coil Current:** ~70mA per channel
- **Total Current (4 channels):** ~280mA

### USB-TTL Adapter Limits
- **5V Output Current:** 500mA max (USB 2.0 spec)
- **Safety Margin:** Use ≤400mA (80% capacity)

**Implication:** 4-channel relay within safe limits, but no headroom for additional devices.

**Warning:** Do NOT connect high-power devices (motors, heaters) to relay contacts without external power supply.

## Future Integration Notes

### R503 Fingerprint Reader
**Delivery Status:** Received and integrated  
**Protocol:** UART packet-based commands  
**Baud Rate:** 57600 (default)  
**Wiring:** TXD/RXD pins (requires second USB-TTL adapter)

**Implementation Complete:**
- Packet structure with header, checksum validation
- Enrollment flow: capture 2x, create template, store in slot
- Verification: scan and search against stored templates
- Template management: delete, count operations

**Integration Architecture:**
- `R503Protocol.ts`: Low-level packet building and parsing
- `SerialFingerprintAdapter.ts`: Hardware communication layer
- `FingerprintController.ts`: HTTP API endpoint handler
- Mock mode available for development without hardware

**Enrollment Flow (Wizard Integration):**
1. Frontend wizard requests slot from backend
2. Backend assigns slot (e.g., slot 5)
3. Frontend calls `POST /api/fingerprint/enroll` with slotId
4. Hardware service captures fingerprint 2x
5. Template stored in R503 sensor at assigned slot
6. Success returned to frontend → User creation completes

**Hardware Setup Notes:**
- Requires second USB-TTL adapter (separate from relay)
- Cross TX/RX wiring: R503 TX → Adapter RX
- Power: 5V from USB-TTL VCC pin
- COM port configured in FINGERPRINT_PORT env var

### Backend Java Integration
**Architecture:** RestTemplate HTTP client  
**Endpoint Base:** http://localhost:3001/api/relay  
**Error Handling:** Circuit breaker pattern (Resilience4j)  

**Example Use Case:**
```java
@Service
public class DoorAccessService {
    @Autowired
    private HardwareClient hardwareClient;
    
    public void unlockDoor(Duration unlockTime) {
        hardwareClient.activateRelayChannel(1);
        Thread.sleep(unlockTime.toMillis());
        hardwareClient.deactivateRelayChannel(1);
    }
}
```

## Known Issues and Workarounds

### Issue: Service Can't Start After Unexpected Shutdown
**Symptom:** "Access denied" on COM port  
**Cause:** Previous Node.js process didn't release serial port  
**Workaround:**
```bash
taskkill //F //IM node.exe
```

### Issue: Relay Clicks But Doesn't Stay Energized
**Symptom:** Relay clicks on command but immediately de-energizes  
**Cause:** Insufficient power supply  
**Fix:** Use external 5V power source instead of USB-TTL VCC

### Issue: Inconsistent Response Times
**Symptom:** Sometimes relay responds instantly, sometimes 200ms delay  
**Cause:** Windows serial port driver buffering  
**Mitigation:** Set `autoOpen: false` and flush buffers after write  
**Status:** Not implemented (delay acceptable for current use case)

## Security Considerations

### Current State (Development)
- No authentication on API endpoints
- CORS allows all origins
- No rate limiting
- No input validation beyond channel ID range

### Production Requirements (TODO)
1. **API Authentication:**
   - JWT token validation
   - Shared secret with backend
   - Request signature verification

2. **CORS Configuration:**
   - Whitelist only backend origin (http://localhost:8080)
   - No wildcards in production

3. **Rate Limiting:**
   - Max 10 requests/second per channel
   - Prevents relay burnout from rapid switching

4. **Audit Logging:**
   - Log all relay state changes with timestamp
   - Include requestor identity
   - Persist to database for compliance

## Performance Metrics

### Latency Measurements
- **API Response Time:** ~15ms (localhost HTTP)
- **Serial Port Write:** ~5ms (GPIO set operation)
- **Relay Physical Actuation:** ~10ms (mechanical delay)
- **Total End-to-End:** ~30ms (curl to click)

### Resource Usage
- **CPU:** <1% idle, ~3% during API calls
- **Memory:** ~25MB Node.js process
- **Disk I/O:** Minimal (logs only)

## Lessons for Future Hardware Integration

1. **Never Assume Protocol:** Always verify with datasheet or testing
2. **Multi-Method Detection:** Windows hardware detection is unreliable, use fallbacks
3. **Active-LOW is Common:** Many optocoupler relays use inverted logic
4. **Log Everything:** Serial communication debugging requires verbose logs
5. **Mock First:** Develop with mocks, test with hardware last
6. **Power Budget:** Calculate total current draw before connecting multiple devices
7. **Replicability First:** Script everything, eliminate manual steps
8. **Physical Testing Required:** No amount of unit tests replaces clicking relay

## Development Tools Used

- **VS Code:** Primary IDE
- **Postman/curl:** API testing
- **PowerShell ISE:** Script debugging
- **Device Manager:** COM port verification
- **Multimeter:** Voltage/continuity testing (hardware verification)

## References

- [FTDI FT232RL Datasheet](https://ftdichip.com/wp-content/uploads/2020/08/DS_FT232R.pdf)
- [Node SerialPort Documentation](https://serialport.io/docs/)
- [SRD-05VDC-SL-C Relay Specs](https://components101.com/switches/5v-single-channel-relay-module-pinout-features-applications-working-datasheet)
- [Windows COM Port Detection](https://learn.microsoft.com/en-us/windows-hardware/drivers/serports/)

---

**Maintained By:** Development Team  
**Last Updated:** November 13, 2025  
**Status:** Channel 1 operational, logic verified, ready for expansion
