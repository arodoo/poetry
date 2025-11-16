# R503 Fingerprint Driver Installation Guide

## Problem Detected

Your R503 is connected but Windows recognizes it as:
- **Class**: CDROM (Mass Storage)
- **Name**: "Finger Module USB Device"
- **Status**: Device OK but NO COM port exposed

## Solution Steps

### Step 1: Check for Virtual CD Drive

The R503 may have mounted a virtual CD with drivers:

1. Open **File Explorer**
2. Look for a new CD/DVD drive (e.g., `D:`, `E:`)
3. If found, open it and run `setup.exe` or `install.exe`

### Step 2: Manual Driver Installation

If no virtual CD appears:

1. Download R503 driver from:
   - **Official**: Search "R503 fingerprint driver Windows" on manufacturer site
   - **Alternative**: FTDI VCP Driver (if using USB-TTL adapter)
     https://ftdichip.com/drivers/vcp-drivers/

2. **For FTDI USB-TTL**:
   ```powershell
   cd poetry-hardware/scripts
   powershell -ExecutionPolicy Bypass -File install-drivers.ps1
   ```

### Step 3: Device Manager Configuration

1. Press `Win + X` → **Device Manager**
2. Find "Finger Module USB Device" under **CD-ROM Drives**
3. Right-click → **Update Driver**
4. Choose **"Browse my computer for drivers"**
5. Select the downloaded driver folder
6. Restart computer if prompted

### Step 4: Verify COM Port

After driver installation:

```bash
cd poetry-hardware
npm run detect:ports
```

Expected output:
```
Found COM ports:
Port: COM3
  Description: USB Serial Port (COM3)
  *** FTDI USB-TTL Adapter Detected ***
```

### Step 5: Alternative - Check USB Mode

Some R503 modules have a **mode switch**:

1. **Disconnect** R503 from USB
2. Check the device for a **physical switch** (UART/USB toggle)
3. Set to **UART mode**
4. Reconnect

## Hardware Specifications

Your R503 model: **R503pro**
- Interface: USB (needs driver) or UART (direct serial)
- Voltage: 5V
- Pixels: 192x192
- Capacity: 1500 fingerprints

## Current Connection Details

From `hardware-components.instructions.md`:

```
4: Lector FingerPrint: Módulo De Identificación De Huellas Dactilares R503pro
Interfaz: USB
Voltaje: 5 V
```

## Troubleshooting

### Still No COM Port After Driver?

The R503pro **USB version** may use a proprietary protocol, not standard serial.

**Solutions**:
1. Check if R503 came with a **USB-to-TTL adapter** (separate cable)
2. Use the **UART pins** instead of USB:
   - R503 has TX/RX pins for serial communication
   - Connect to FTDI USB-TTL adapter (like your relay one)
   - Connection:
     ```
     R503 TX  →  FTDI RX
     R503 RX  →  FTDI TX
     R503 VCC →  FTDI 5V
     R503 GND →  FTDI GND
     ```

### Check Device ID

Current detected:
```
InstanceId: USBSTOR\CDROM&VEN_&PROD_FINGER_MODULE&REV_0110\1234567890ABCDEF&0
```

This is a **generic mass storage ID**, not a serial device.

### Recommended Next Steps

1. **Check R503 packaging** for included driver CD/USB
2. **Search manufacturer website** with model "R503pro"
3. **Consider UART mode** if USB driver unavailable
4. **Contact seller** for driver download link

## Once Working

Update `.env`:
```env
MOCK_MODE=false
FINGERPRINT_PORT=COM4  # or detected port
USB_TTL_PORT=COM3      # relay board
```

Start service:
```bash
npm run dev
```

Test enrollment:
```bash
curl -X POST http://localhost:3001/api/fingerprint/enroll \
  -H "Content-Type: application/json" \
  -d '{"slotId": 1}'
```

## Need Help?

Check logs:
```
logs/hardware/hardware-dev.log
```

Run diagnostics:
```bash
npm run test
```
