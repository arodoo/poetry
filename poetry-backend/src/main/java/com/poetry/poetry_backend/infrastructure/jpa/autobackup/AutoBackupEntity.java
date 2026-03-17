/*
 * File: AutoBackupEntity.java
 * Purpose: Entity for storing auto backup metadata.
 * Records each automatic backup generated at application startup.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.jpa.autobackup;

import java.time.Instant;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "auto_backup")
@Getter
@Setter
public class AutoBackupEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String fileName;

  @Column(nullable = false)
  private String filePath;

  @Column(nullable = false)
  private Long sizeBytes;

  @Column(nullable = false)
  private Instant generatedAt;

  @Column(nullable = false)
  private Instant createdAt;

  public AutoBackupEntity() {}

  public AutoBackupEntity(
      String fileName,
      String filePath,
      Long sizeBytes,
      Instant generatedAt) {
    this.fileName = fileName;
    this.filePath = filePath;
    this.sizeBytes = sizeBytes;
    this.generatedAt = generatedAt;
    this.createdAt = Instant.now();
  }
}
