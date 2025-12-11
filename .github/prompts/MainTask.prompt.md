# R503 Fingerprint Integration - Implementation Plan

## Overview

Complete integration of R503 fingerprint sensor with poetry-backend and
poetry-frontend, including hardware communication, cleanup automation,
template management, and user interface.

---

## Phase 3: Hardware Integration ✅

Connect cleanup job with poetry-hardware to delete templates from R503.

- [x] Add endpoint in poetry-hardware for batch template deletion
- [x] Call hardware service from FingerprintCleanupJob after archiving
- [x] Handle R503 deletion failures gracefully (retry logic)
- [x] Log slot IDs freed for monitoring

---

## Phase 4: Template Restoration ✅

Enable re-uploading archived templates back to R503 when needed.

- [x] Create RestoreFingerprintUseCase
- [x] Find available R503 slot for restoration
- [x] Upload templateBackup to R503 via hardware service
- [x] Update entity with new slotId, status = ACTIVE
- [x] Add REST endpoint for restoration

---

## Phase 5: Dashboard/UI ✅

Visualize R503 system status in frontend.

- [x] Create FingerprintAdminPage component
- [x] Show R503 slot usage (used/available out of 1500)
- [x] List archived templates with restore option
- [ ] Show cleanup job history/logs (deferred - requires backend actuator)
- [x] Add SDK types and queries

---

## Phase 6: E2E Tests ✅

Complete integration testing of full fingerprint flow.

- [x] Test enroll -> verify -> archive -> restore cycle
- [x] Test cleanup job execution
- [x] Test hardware communication failures
- [x] Test slot exhaustion scenarios

---

## Configuration Reference

```yaml
app.fingerprint.inactivity-days: 90
app.fingerprint.cleanup-batch-size: 50
app.fingerprint.cleanup-enabled: true
app.fingerprint.cleanup-cron: 0 0 3 * * *
```
