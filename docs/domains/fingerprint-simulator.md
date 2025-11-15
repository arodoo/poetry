# Fingerprint Simulator Documentation

## Overview

Complete hardware simulator for R503 fingerprint reader development without
physical device.

## URL

`/:locale/fingerprints/simulator`

## Features

### 1. Manual Enrollment Section

- Input: Slot ID (0-1500)
- Action: Simulates fingerprint enrollment via API
- Feedback: Success/error messages in access log
- Behavior: Calls `POST /api/v1/fingerprints` with slot ID

### 2. Access Verification Section

- Input: Slot ID to verify
- Action: Simulates fingerprint scan and verification
- Feedback: Real-time GRANTED/DENIED with user ID
- Behavior: Calls `POST /api/v1/fingerprints/verify`

### 3. Enrolled Database Viewer

- Display: Real-time list of all enrolled fingerprints
- Columns: Slot ID, User ID, Status
- Quick Actions: "Quick Test" button per row
- Behavior: Fetches from `GET /api/v1/fingerprints`

### 4. Access Log Console

- Style: Terminal-style monospaced text (green on black)
- Content: Timestamped verification attempts
- Actions: Clear button to reset log
- Format: `[HH:MM:SS] ✓/✗ ACTION - Details`

## Usage Flow

### Typical Development Workflow

1. **Enroll Test Fingerprints**:
   - Enter slot IDs (e.g., 1, 2, 3)
   - Click "Simulate Enrollment"
   - Check success in access log

2. **Verify Enrolled Prints**:
   - Enter known slot ID
   - Click "Simulate Scan"
   - Observe GRANTED/DENIED feedback

3. **Quick Testing**:
   - Use "Quick Test" buttons in database viewer
   - Verify multiple slots rapidly

4. **Monitor Activity**:
   - Watch access log for real-time feedback
   - Clear log when needed for fresh testing

## Backend Integration

### Required Backend State

- Backend must run in DEV_BYPASS mode for simulation
- Slot 999 automatically maps to User ID 1
- All API endpoints functional without hardware

### API Endpoints Used

- `GET /api/v1/fingerprints` - List enrolled
- `POST /api/v1/fingerprints` - Enroll new
- `POST /api/v1/fingerprints/verify` - Verify access

## Translation Keys

- `ui.fingerprints.simulator.*` - Main UI labels
- `ui.fingerprints.simulator.enroll.*` - Enrollment section
- `ui.fingerprints.simulator.verify.*` - Verification section
- `ui.fingerprints.simulator.database.*` - Database viewer
- `ui.fingerprints.simulator.log.*` - Access log

## Technical Notes

- Uses React Query for cache invalidation
- Real API calls (not mocked frontend responses)
- Log stored in component state (not persisted)
- Mutations trigger automatic database refresh

## Migration Path

When R503 hardware arrives:

1. Connect physical reader via USB-TTL adapter
2. Remove DEV_BYPASS from backend
3. Frontend code requires NO changes
4. Simulator remains functional for testing

---

© 2025 Poetry. All rights reserved.
