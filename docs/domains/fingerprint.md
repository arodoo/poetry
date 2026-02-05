# Fingerprint Domain

Biometric authentication module enabling fingerprint enrollment and verification
for secure physical access control. Integrates with HID Digital Persona
(FMD-based) readers via backend SDK.

## Architecture

```
Frontend (React) → Backend (Java) → HID SDK (dpfpdd) → U.are.U 4500
```

The backend communicates directly with the HID Digital Persona SDK to capture
fingerprints. The frontend calls backend endpoints to initiate capture and
enrollment operations.

## Database Schema

### Table: `fingerprints`

| Column           | Type        | Constraints                     |
| ---------------- | ----------- | ------------------------------- |
| id               | BIGINT      | PRIMARY KEY, AUTO_INCREMENT     |
| user_id          | BIGINT      | NOT NULL, FK(users.id)          |
| fmd              | TEXT        | NOT NULL (Base64 FMD)           |
| status           | VARCHAR(20) | NOT NULL, ENUM(ACTIVE,ARCHIVED) |
| enrolled_at      | TIMESTAMP   | NOT NULL                        |
| last_activity_at | TIMESTAMP   | NULL                            |
| created_at       | TIMESTAMP   | NOT NULL, auto-generated        |
| updated_at       | TIMESTAMP   | NOT NULL, auto-updated          |
| deleted_at       | TIMESTAMP   | NULL (soft delete)              |
| version          | BIGINT      | NOT NULL, optimistic lock       |

**Indexes:**

- `idx_fingerprints_user` on `user_id`
- `idx_fingerprints_status` on `status`

## API Endpoints

- `POST /api/v1/fingerprints/capture` - Initiate capture from HID reader
- `POST /api/v1/fingerprints/enroll` - Enroll captured FMD for current user
- `POST /api/v1/fingerprints/verify` - Verify FMD (server-side matching)
- `GET /api/v1/fingerprints` - List all enrolled fingerprints
- `DELETE /api/v1/fingerprints/{id}` - Soft-delete fingerprint

## Integration Flow

1. **Capture**: Frontend calls POST /capture → Backend activates HID SDK
2. **Wait**: User places finger on reader → SDK captures FMD
3. **Return**: Backend returns FMD to frontend
4. **Enrollment**: Frontend calls POST /enroll with FMD → Save to DB
5. **Verification**: POST /verify with probe FMD → Match against DB templates

## SDK Requirements

- HID Digital Persona SDK installed on backend server
- Native library (dpfpdd.dll) in JNI path
- Profile `prod` for real SDK, `stub` for simulated capture

All Rights Reserved Arodi Emmanuel
