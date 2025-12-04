# R503Pro-USB Integration Requirements

Hardware and software requirements for the R503Pro-USB fingerprint module.

## Hardware Requirements

| Component          | Specification                   |
| ------------------ | ------------------------------- |
| Fingerprint Module | R503Pro-USB (Grow/SYN brand)    |
| USB Connection     | Direct USB, VID:4612 PID:04B4   |
| Relay Module       | 4-channel USB-TTL relay on COM3 |

## Software Requirements

| Component      | Version | Purpose                            |
| -------------- | ------- | ---------------------------------- |
| Node.js 32-bit | v18+    | fingerprint-bridge (SynoAPIEx.dll) |
| Node.js 64-bit | v20+    | poetry-hardware service            |
| Windows        | 10/11   | SynoAPIEx.dll is Windows-only      |

## Service Architecture

| Service            | Port | Node.js | Function           |
| ------------------ | ---- | ------- | ------------------ |
| fingerprint-bridge | 3001 | 32-bit  | SDK FFI interface  |
| poetry-hardware    | 3002 | 64-bit  | Relay + HTTP proxy |

## SDK Details

- **DLL**: SynoAPIEx.dll (32-bit)
- **Device Type**: UDisk (type 2), not USB (type 0)
- **Address**: 0xFFFFFFFF (uint32)
- **Baud**: 6 (57600)

## Critical FFI Notes

Address parameter MUST be `uint32`, not `int`. Otherwise 0xFFFFFFFF becomes -1
and causes code 32 (address error).

## Files

- Bridge: `tools/fingerprint-bridge/`
- Hardware: `poetry-hardware/`
- Docs: `docs/domains/fingerprint-integration-log.md`
