/*
 * File: BackupInfo.java
 * Purpose: DTO for auto backup info.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.dbmanagement;

public class BackupInfo {
  public Long id;
  public String fileName;
  public long generatedAt;
  public long sizeBytes;

  public BackupInfo() {}

  public BackupInfo(Long id, String fileName, long generatedAt, long sizeBytes) {
    this.id = id;
    this.fileName = fileName;
    this.generatedAt = generatedAt;
    this.sizeBytes = sizeBytes;
  }
}
