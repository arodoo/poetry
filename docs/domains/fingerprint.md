# Fingerprint Domain

Biometric authentication module enabling fingerprint enrollment and verification
for secure physical access control. Integrates with hardware service (R503 reader)
and relay activation system for door unlock functionality.

## Purpose

Provides secure user authentication via fingerprint templates stored in database.
Supports enrollment workflow from frontend and verification workflow triggering
relay activation upon successful match.

## Database Schema

### Table: `fingerprints`

| Column         | Type                  | Constraints                     |
| -------------- | --------------------- | ------------------------------- |
| id             | BIGINT                | PRIMARY KEY, AUTO_INCREMENT     |
| user_id        | BIGINT                | NOT NULL, FK(users.id)          |
| template_data  | TEXT                  | NOT NULL (base64 encoded)       |
| status         | VARCHAR(20)           | NOT NULL, ENUM(ACTIVE,INACTIVE) |
| enrolled_at    | TIMESTAMP             | NOT NULL                        |
| created_at     | TIMESTAMP             | NOT NULL, auto-generated        |
| updated_at     | TIMESTAMP             | NOT NULL, auto-updated          |
| deleted_at     | TIMESTAMP             | NULL (soft delete)              |
| version        | BIGINT                | NOT NULL, optimistic lock       |

**Indexes:**

- `idx_fingerprints_user` on `user_id`
- `idx_fingerprints_status` on `status`

## API Endpoints

- `POST /api/v1/fingerprints/enroll` - Enroll fingerprint for current user
- `POST /api/v1/fingerprints/verify` - Verify captured fingerprint
- `GET /api/v1/fingerprints` - List all enrolled fingerprints
- `DELETE /api/v1/fingerprints/{id}` - Soft-delete fingerprint

## Integration Flow

1. **Enrollment**: Frontend captures template → POST /enroll → Save to DB
2. **Verification**: Frontend captures template → POST /verify → Match against DB
3. **Access Grant**: On match → Frontend calls hardware service relay endpoint
4. **Relay Activation**: Hardware service opens relay for configured duration

All Rights Reserved.
