# R503Pro-USB Installation Guide

Step-by-step setup for R503Pro-USB fingerprint reader on Windows.

## Prerequisites

- Windows 10/11
- Node.js 64-bit (v20+) for poetry-hardware
- Node.js 32-bit (v18+) for fingerprint-bridge

## Step 1: Install Node.js 32-bit

The R503 SDK (SynoAPIEx.dll) is 32-bit, requires 32-bit Node.js.

1. Download Node.js 32-bit from https://nodejs.org
2. Install to `C:\Program Files (x86)\nodejs\`
3. Verify: `"C:\Program Files (x86)\nodejs\node.exe" --version`

## Step 2: Connect R503Pro-USB

1. Plug the R503Pro-USB module via USB
2. Windows will detect it as "UDisk" device (this is normal)
3. No driver installation needed

## Step 3: Install fingerprint-bridge dependencies

```bash
cd tools/fingerprint-bridge
"C:\Program Files (x86)\nodejs\node.exe" -e "console.log(process.arch)"
# Should output: ia32

npm install
```

## Step 4: Verify DLL location

Ensure `SynoAPIEx.dll` exists at:

```
tools/fingerprint-bridge/dll/SynoAPIEx.dll
```

## Step 5: Test fingerprint-bridge

```bash
cd tools/fingerprint-bridge
"C:\Program Files (x86)\nodejs\node.exe" src/index.js
```

Expected output:

```
Architecture: ia32
SDK initialized successfully
Bridge running on port 3001 (ia32)
```

## Step 6: Test device connection

With bridge running, open another terminal:

```bash
curl -X POST http://localhost:3001/device/open
```

Expected: `{"success":true,"code":0,...}`

## Step 7: Configure poetry-hardware

Ensure `.env` has:

```
PORT=3002
MOCK_MODE=false
USB_TTL_PORT=COM3
FINGERPRINT_BRIDGE_URL=http://localhost:3001
```

## Startup Order

1. fingerprint-bridge (port 3001) - MUST start first
2. poetry-hardware (port 3002) - connects to bridge

Use `run-poetry.bat` for automatic startup.

## Troubleshooting

### Code 32 (Address Error)

- FFI bindings use `uint32` for address, not `int`
- Address must be 0xFFFFFFFF

### Device not found

- R503Pro-USB is detected as UDisk (type 2), not USB (type 0)
- SDK auto-detects via PSGetUDiskNum()

### Bridge crashes on start

- Verify 32-bit Node.js: `node -e "console.log(process.arch)"`
- Must show `ia32`, not `x64`

### poetry-hardware can't connect

- Ensure bridge is running on port 3001
- Check FINGERPRINT_BRIDGE_URL in .env

## Architecture

```
┌─────────────────┐     HTTP:3001     ┌──────────────────┐
│ poetry-hardware │ ◄───────────────► │ fingerprint-bridge│
│   (64-bit)      │                   │    (32-bit)       │
│   Port 3002     │                   │  SynoAPIEx.dll    │
└─────────────────┘                   └──────────────────┘
```

## Files Reference

| Path                                | Purpose               |
| ----------------------------------- | --------------------- |
| `tools/fingerprint-bridge/`         | 32-bit bridge service |
| `tools/fingerprint-bridge/dll/`     | SynoAPIEx.dll SDK     |
| `poetry-hardware/`                  | Main hardware service |
| `docs/domains/r503-requirements.md` | Technical specs       |
