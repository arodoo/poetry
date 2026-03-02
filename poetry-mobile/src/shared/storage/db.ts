/*
 * File: db.ts
 * Purpose: SQLite database singleton and migration runner for
 * the offline-first inventory app. Opens the database on first
 * call and runs pending migrations. All features register
 * their tables through the migrations array.
 * All Rights Reserved. Arodi Emmanuel
 */
import * as SQLite from 'expo-sqlite'
import { StorageError } from './StorageError'

const DB_NAME = 'poetry-inventory.db'

let dbInstance: SQLite.SQLiteDatabase | null = null

const MIGRATIONS: string[] = [
  `CREATE TABLE IF NOT EXISTS app_meta (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  )`,
]

async function runMigrations(
  db: SQLite.SQLiteDatabase
): Promise<void> {
  for (const sql of MIGRATIONS) {
    await db.execAsync(sql)
  }
}

export async function getDb(): Promise<
  SQLite.SQLiteDatabase
> {
  if (dbInstance) return dbInstance
  try {
    dbInstance = await SQLite.openDatabaseAsync(DB_NAME)
    await runMigrations(dbInstance)
    return dbInstance
  } catch (err: unknown) {
    throw new StorageError(
      'db.open',
      'Failed to open SQLite database',
      err
    )
  }
}

export function addMigration(sql: string): void {
  MIGRATIONS.push(sql)
}

export async function closeDb(): Promise<void> {
  if (dbInstance) {
    await dbInstance.closeAsync()
    dbInstance = null
  }
}
