# Fingerprint Template Backup System

## Overview
Enables backup/restore of fingerprint templates to/from R503 device.

## Architecture

### Bridge Service (32-bit, port 3001)
- `template-download.js`: Downloads template from device via FFI
- `template-upload.js`: Uploads template to device via FFI
- Routes: `GET/POST /fingerprint/template/:slotId`

### Hardware Service (64-bit, port 3002)
- `TemplateDownloadHandler.ts`: HTTP handler for GET
- `TemplateUploadHandler.ts`: HTTP handler for POST
- Routes: `GET/POST /api/fingerprint/template/:slotId`

## API Reference

### Download Template
```
GET /api/fingerprint/template/:slotId
Response: { success: true, template: "base64..." }
```

### Upload Template
```
POST /api/fingerprint/template
Body: { slotId: number, template: "base64..." }
Response: { success: true }
```

## Template Format
- Size: 768 bytes
- Encoding: Base64 for transport
- R503 CharBuffer format

## FFI Functions Used
- `PSLoadChar`: Load template from flash to buffer
- `PSUpChar`: Upload buffer to host
- `PSDownChar`: Download from host to buffer
- `PSStoreChar`: Store buffer to flash
