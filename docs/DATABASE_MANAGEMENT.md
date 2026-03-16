# Database Management Feature

## Overview

Admin-only feature for exporting, backing up, and restoring the Poetry database. Accessible via `/db-management` sidebar link (admin users only).

## Features

### 1. Excel Export
- Select all or specific database tables
- Downloads as `.xlsx` file
- Includes row counts and data types
- Select-all checkbox for convenience

**API**: `GET /api/v1/db-management/export/excel?tables=all` or `?tables=users,zones`

### 2. SQL Backup
- One-click full database backup
- Includes schema DDL + INSERT statements
- Downloads as timestamped `.sql` file
- Covers all 30 tables + data + relationships

**API**: `GET /api/v1/db-management/backup`

### 3. Database Restore
- Upload `.sql` backup file to restore
- Confirmation dialog prevents accidental restore
- Handles foreign key constraints automatically
- Full transaction rollback on failure
- Tracks restored tables in response

**API**: `POST /api/v1/db-management/restore` (multipart file upload)

## Architecture

### Backend (DDD/Hexagonal)
```
domain/dbmanagement/
  └── model/TableInfo.java

application/dbmanagement/
  ├── port/ (4 interfaces: TableList, ExcelExport, SqlBackup, SqlRestore)
  └── usecase/ (4 use cases: List, ExportExcel, Backup, Restore)

infrastructure/jdbc/dbmanagement/
  ├── JdbcTableListAdapter
  ├── JdbcExcelExportAdapter + JdbcExcelSheetWriter
  ├── JdbcSqlBackupAdapter + schema/data writers
  └── JdbcSqlRestoreAdapter + parser + constraint helper

interfaces/v1/dbmanagement/
  ├── DbListTablesController
  ├── DbExcelExportController
  ├── DbSqlBackupController
  ├── DbSqlRestoreController
  └── DbManagementDtos

config/dbmanagement/
  └── DbManagementComposition.java
```

### Frontend (React/TypeScript)
```
features/db-management/
├── api/ → fetchBlob, downloadBlob, uploadMultipart, API wrappers
├── hooks/ → useTablesQuery, useExcelExport, useBackupDownload, useRestoreMutation
├── components/ → ExcelExportSection, BackupSection, RestoreSection, RestoreConfirmDialog
├── pages/ → DbManagementPage (3-tab layout)
├── routing/ → Admin-guarded routes
├── locales/ → en.json + es.json (bilingual)
└── model/ → TypeScript types
```

## Authentication & Authorization

- **Admin-only**: All endpoints require `hasAuthority('admin')`
- Sidebar link hidden from non-admin users
- Routes guarded by `<RequireRole role="admin">`

## Key Technical Notes

### Restore Safety
1. Disables FK constraints: `SET session_replication_role = 'replica'`
2. Truncates all tables before INSERT
3. Executes all statements in single transaction
4. Re-enables FK constraints after success
5. Rollback on any error

### File Handling
- **Excel**: Generated in-memory via Apache POI (5.2.5)
- **SQL**: Streamed as text, supports large backups
- **Restore**: Parses multi-line SQL, respects quoted strings
- All downloads have `Content-Disposition: attachment` headers

### Database Support
- Tested on PostgreSQL 13+
- Uses JDBC metadata (no Hibernate internals)
- Handles 30 tables including fingerprints (FMD field as Base64 TEXT)

## E2E Tests (22 tests across 4 files)

Located in `tests/e2e/db-management/`:

- `db-management-page.spec.ts` — UI rendering, tabs, navigation (5 tests)
- `db-management-excel.spec.ts` — Export selection, checkboxes, API call (4 tests)
- `db-management-backup.spec.ts` — Backup button, loading state, API (4 tests)
- `db-management-restore.spec.ts` — File upload, confirmation dialog (5 tests)
- `db-management-api.spec.ts` — Direct API validation (4 tests)

## Usage

1. **Navigate**: Sidebar → Database (admin only)
2. **Export Excel**: Select tables → "Export to Excel" → download
3. **Backup**: Click "Download Backup" → save `.sql` file
4. **Restore**: Upload `.sql` → confirm → wait for completion

## Dependencies Added

- **Backend**: `org.apache.poi:poi-ooxml:5.2.5`
- **Frontend**: None (uses native Blob/fetch APIs)

## File Counts

- Backend: 22 files, all ≤78 lines
- Frontend: 18 files, all ≤73 lines
- Tests: 5 spec files, 446 lines total
- Modified files: 6 (sidebar, routing, i18n catalogs, pom.xml)

## Internationalization

Both English and Spanish:
- `ui.dbManagement.*` keys for feature text
- `ui.route.dbManagement.title` for sidebar
- All error/success messages localized
