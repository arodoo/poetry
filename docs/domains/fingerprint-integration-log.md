# R503Pro USB Fingerprint Module - Integration Log

## Date: November 30, 2025

## Hardware

- **Module:** R503Pro-USB Fingerprint Reader (GROW/Hangzhou)
- **Interface:** USB (DC 5V)
- **VID/PID:** 4612 / 04B4
- **Capabilities:** 1500 templates, 508dpi, 192x192 pixels

---

## Final Solution ✅ WORKING

### Root Causes Found

1. **Device Type:** R503Pro-USB is detected as **UDisk** (type 2), not USB
   (type 0). `PSGetUSBDevNum` returns 0, but `PSGetUDiskNum` returns 1.

2. **Address Parameter:** Must be passed as **uint32** in FFI bindings, not
   int. Using `int` causes `0xFFFFFFFF` to be interpreted as `-1`, breaking
   protocol communication (error 32).

### Working Configuration

```javascript
// Device type detection (like Demo.exe does)
PSGetUSBDevNum() => count: 0  // No USB devices
PSGetUDiskNum() => count: 1   // Device detected as UDisk!

// Open with UDisk type
PSOpenDeviceEx(handle, DEVICE_UDISK=2, com=1, baud=6, packSize=2, devId=0)
// Returns code 0, handle obtained

// FFI binding fix - use uint32 for address
funcs.PSGetImage = lib.func('int __stdcall PSGetImage(int h, uint32 addr)');
// Now returns code 0 (success) or code 2 (no finger)
```

### Architecture

```
poetry-hardware (x64) ←HTTP:3001→ fingerprint-bridge (x86 + SynoAPIEx.dll)
```

- Node.js x86 v20.18.1 at `C:\Program Files (x86)\nodejs\`
- Express + Koffi for FFI bindings
- Hot-reload via nodemon with node32.cmd wrapper

---

## SDKs Available

### 1. SynoAPIEx.dll (32-bit)
- **Location:** `tools/fingerprint-bridge/dll/SynoAPIEx.dll`
- **Size:** 184KB
- **Used by:** Demo.exe (works perfectly)
- **Key exports:** PSAutoOpen, PSOpenDeviceEx, PSGetImage, PSGenChar,
  PSSearch, PS_AutoEnroll, PS_AutoIdentify

### 2. FMBioFpr.dll (64-bit)
- **Location:** `tools/sdk/fingerprint/win-sdk/.../bin/x64/FMBioFpr.dll`
- **Documentation:** `tools/sdk/fingerprint/lib/libFpr.h`
- **Key exports:** FMAutoOpen, FMOpenDeviceEx, FMGetImage, FMGenChar, etc.

---

## Approaches Tested

### Approach A: FFI Direct with FMBioFpr.dll (64-bit) ❌ FAILED
**Goal:** Use 64-bit SDK directly from poetry-hardware (Node.js x64)

**Result:** Communication errors (0x01, 0xFF)

**Root Cause:** Windows assigns USBSTOR driver (treats device as USB
storage), incompatible with SDK's expected USB protocol.

### Approach B: Driver Installation ❌ FAILED
**Goal:** Install WinUSB/libusb-win32 driver to fix communication

**Attempts:**
1. Created custom .inf files (R503Pro.inf, R503Pro-WinUSB.inf)
2. Used Zadig to install WinUSB (v6.1.7600.16385)
3. Used Zadig to install libusb-win32 (v1.2.7.3)

**Results:**
- WinUSB: FMBioFpr.dll still returns 0xFF
- libusb-win32: FMBioFpr.dll still returns 0xFF
- Both drivers **broke Demo.exe** functionality

**Recovery:** Restored original USB Storage driver via Device Manager
→ Demo.exe works again

### Approach C: Bridge with SynoAPIEx.dll (32-bit) ✅ SUCCESS

**Goal:** Create HTTP bridge using 32-bit Node.js + SynoAPIEx.dll

**Architecture:**

```
poetry-hardware (x64) ←HTTP:3001→ fingerprint-bridge (x86 + SynoAPIEx.dll)
```

**Setup:**

1. Installed Node.js x86 (32-bit) v20.18.1
2. Created fingerprint-bridge service with express + koffi
3. Configured nodemon with node32.cmd wrapper for hot-reload

**Key Discoveries:**

1. Device detected as **UDisk** (type 2), not USB (type 0)
2. Address parameter must be **uint32** in FFI (not int)
3. DLLs needed: SynoAPIEx.dll, FtrToPoints.dll, FtrToPoints2.dll,
   TypeConfig.dll

**Results:**

- ✅ PSOpenDeviceEx with type=2 (UDisk) returns code 0
- ✅ PSGetImage returns code 0 (finger present) or 2 (no finger)
- ✅ Full device communication working

---

## Error Code Reference (from libFpr.h)

| Code | Hex  | Meaning |
|------|------|---------|
| 0x00 | 0    | Success |
| 0x01 | 1    | Communication error |
| 0x02 | 2    | No finger on sensor |
| 0x09 | 9    | No match found |
| 0x20 | 32   | Address code incorrect |
| 0xFF | 255  | Unknown/communication failure |

---

## Current State

### Working

- ✅ fingerprint-bridge with SynoAPIEx.dll (32-bit)
- ✅ Device opens as UDisk (type 2)
- ✅ PSGetImage captures fingerprint successfully
- ✅ Demo.exe continues to work
- Driver: USB Mass Storage (USBSTOR)

### fingerprint-bridge Structure
```
tools/fingerprint-bridge/
├── package.json
├── nodemon.json
├── node32.cmd (wrapper for 32-bit Node)
├── dll/
│   └── SynoAPIEx.dll (+ dependencies)
└── src/
    ├── index.js (entry point)
    ├── application/
    │   ├── index.js
    │   └── fingerprint-service.js
    └── infrastructure/
        ├── ffi/
        │   ├── index.js
        │   ├── dll-loader.js
        │   └── ffi-bindings.js
        └── http/
            ├── server-factory.js
            └── routes/
                ├── index.js
                ├── device-routes.js
                ├── capture-routes.js
                └── workflow-routes.js
```

### API Endpoints:
- `GET /health` - Server status
- `GET /device/status` - Device handle and address
- `POST /device/open` - Open device connection
- `POST /device/close` - Close device connection
- `POST /capture` - Capture fingerprint image
- `POST /fingerprint/enroll` - Auto-enroll fingerprint
- `POST /fingerprint/identify` - Auto-identify fingerprint

---

## Key Lessons Learned

1. **Device type matters** - R503Pro-USB detected as UDisk, not USB
2. **FFI type precision** - uint32 vs int for address parameter is critical
3. **32-bit vs 64-bit** - SDK architecture must match Node.js
4. **Demo.exe is the reference** - Analyze working code flow
5. **Copy all DLLs** - SynoAPIEx.dll has dependencies

---

## Files Created/Modified

### New Files:
- `tools/fingerprint-bridge/` (entire directory)
- `tools/sdk/fingerprint/driver/zadig-2.8.exe`
- `tools/sdk/fingerprint/driver/R503Pro.inf`
- `tools/sdk/fingerprint/driver/R503Pro-WinUSB.inf`
- `.github/instructions/R503ProManual.txt`

### Deleted:
- `poetry-hardware/src/infrastructure/ffi/` (legacy attempt)

---

## Lessons Learned

1. **Device type detection** - Always check both USB and UDisk counts
2. **FFI type precision** - uint32 vs int matters for large values
3. **32-bit SDK requires 32-bit Node** - Architecture must match
4. **Demo.exe is the reference** - Study working implementation
5. **Copy all DLLs** - Check for dependencies (FtrToPoints*.dll)
