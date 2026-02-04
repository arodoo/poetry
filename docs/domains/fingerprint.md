# Fingerprint Domain

Biometric authentication module enabling fingerprint enrollment and verification
for secure physical access control. Integrates with HID Digital Persona
(FMD-based) readers and relay activation system.

## Purpose

Provides secure user authentication via FMD (Fingerprint Minutiae Data) stored
in the database. Supports enrollment workflow from frontend and verification
workflow triggering relay activation upon successful match.

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

- `POST /api/v1/fingerprints/enroll` - Enroll fingerprint for current user
- `POST /api/v1/fingerprints/verify` - Verify captured fingerprint (server-side matching)
- `GET /api/v1/fingerprints` - List all enrolled fingerprints
- `DELETE /api/v1/fingerprints/{id}` - Soft-delete fingerprint

## Integration Flow

1. **Enrollment**: Hardware service captures FMD → POST /enroll → Save to DB
2. **Verification**: Hardware service captures FMD → POST /verify → Match against DB templates
3. **Access Grant**: On match → Backend returns matched user details
4. **Relay Activation**: Hardware service activates relay for door unlock

All Rights Reserved Arodi Emmanuel
