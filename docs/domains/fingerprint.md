# Fingerprint Domain

Biometric authentication module enabling fingerprint enrollment and verification
for secure physical access control. Integrates with hardware service (R503
reader) and relay activation system for door unlock functionality.

## Purpose

Provides secure user authentication via fingerprint templates stored in
database. Supports enrollment workflow from frontend and verification workflow
triggering relay activation upon successful match.

## Database Schema

### Table: `fingerprints`

| Column           | Type        | Constraints                     |
| ---------------- | ----------- | ------------------------------- |
| id               | BIGINT      | PRIMARY KEY, AUTO_INCREMENT     |
| user_id          | BIGINT      | NOT NULL, FK(users.id)          |
| r503_slot_id     | INTEGER     | NULL (null when archived)       |
| template_backup  | BLOB        | NULL (stores backup on archive) |
| status           | VARCHAR(20) | NOT NULL, ENUM(ACTIVE,ARCHIVED) |
| enrolled_at      | TIMESTAMP   | NOT NULL                        |
| archived_at      | TIMESTAMP   | NULL                            |
| last_activity_at | TIMESTAMP   | NULL (for 7-day archival job)   |
| created_at       | TIMESTAMP   | NOT NULL, auto-generated        |
| updated_at       | TIMESTAMP   | NOT NULL, auto-updated          |
| deleted_at       | TIMESTAMP   | NULL (soft delete)              |
| version          | BIGINT      | NOT NULL, optimistic lock       |

**Indexes:**

- `idx_fingerprints_user` on `user_id`
- `idx_fingerprints_status` on `status`
- `idx_fingerprints_slot` on `r503_slot_id`

### Table: `fingerprint_slot_history`

| Column         | Type        | Constraints                                  |
| -------------- | ----------- | -------------------------------------------- |
| id             | BIGINT      | PRIMARY KEY, AUTO_INCREMENT                  |
| fingerprint_id | BIGINT      | NOT NULL                                     |
| user_id        | BIGINT      | NOT NULL                                     |
| r503_slot_id   | INTEGER     | NOT NULL                                     |
| assigned_at    | TIMESTAMP   | NOT NULL, auto-generated                     |
| released_at    | TIMESTAMP   | NULL (null = currently assigned)             |
| reason         | VARCHAR(30) | ENUM(ENROLLED,ARCHIVED_INACTIVE,RESTORED...) |
| version        | BIGINT      | NOT NULL, optimistic lock                    |

**Indexes:**

- `idx_slot_history_fprint` on `fingerprint_id`
- `idx_slot_history_user` on `user_id`
- `idx_slot_history_slot` on `r503_slot_id`

**Purpose:** Audit trail for slot assignments. Tracks which user had which slot
at any point in time. Critical for forensic analysis when slots are reused after
inactivity archival (7-day rule).

## API Endpoints

- `POST /api/v1/fingerprints/enroll` - Enroll fingerprint for current user
- `POST /api/v1/fingerprints/verify` - Verify captured fingerprint
- `GET /api/v1/fingerprints` - List all enrolled fingerprints
- `DELETE /api/v1/fingerprints/{id}` - Soft-delete fingerprint

## Integration Flow

1. **Enrollment**: Frontend captures template → POST /enroll → Save to DB
2. **Verification**: Frontend captures template → POST /verify → Match against
   DB
3. **Access Grant**: On match → Frontend calls hardware service relay endpoint
4. **Relay Activation**: Hardware service opens relay for configured duration

All Rights Reserved.
