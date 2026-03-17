/*
 * File: AutoBackupCommandService.java
 * Purpose: Command service for auto backups.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.dbmanagement.service;

import org.springframework.stereotype.Service;

import com.poetry.poetry_backend.infrastructure.jpa.autobackup.AutoBackupJpaRepository;

@Service
public class AutoBackupCommandService {
  private final AutoBackupJpaRepository backupRepo;

  public AutoBackupCommandService(AutoBackupJpaRepository backupRepo) { this.backupRepo = backupRepo; }

  public boolean deleteBackup(Long id) {
    if (!backupRepo.existsById(id)) return false;
    backupRepo.deleteById(id);
    return true;
  }
}
