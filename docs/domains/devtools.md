# Devtools Domain

## Overview
The Devtools domain provides hardware debugging and diagnostic tools for administrators.

## Key Features
- Hardware Debug Page: Interface for interacting with the R503 fingerprint sensor.
- Slot Management: View and clear used slots on the sensor.

## Architecture
- **Pages**: `HardwareDebugPage`
- **API**: Direct interaction with `poetry-hardware` service via `fingerprintApi` (shared) and local `devtoolsApi`.
