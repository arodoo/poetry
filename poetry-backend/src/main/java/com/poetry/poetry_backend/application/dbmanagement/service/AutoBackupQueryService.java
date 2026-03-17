/*
 * File: AutoBackupQueryService.java
 * Purpose: Query service for auto backups.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.application.dbmanagement.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.poetry.poetry_backend.domain.shared.model.PageResult;
import com.poetry.poetry_backend.infrastructure.jpa.autobackup.AutoBackupEntity;
import com.poetry.poetry_backend.infrastructure.jpa.autobackup.AutoBackupJpaRepository;
import com.poetry.poetry_backend.interfaces.v1.dbmanagement.BackupInfo;

@Service
public class AutoBackupQueryService {
  private final AutoBackupJpaRepository backupRepo;

  public AutoBackupQueryService(AutoBackupJpaRepository backupRepo) { this.backupRepo = backupRepo; }

  public PageResult<BackupInfo> listBackups(int page, int size, String search, String sortField, String direction) {
    Pageable pageable = Pageable.ofSize(size).withPage(page);
    Page<AutoBackupEntity> entityPage = (search != null && !search.isBlank())
        ? backupRepo.findByFileNameContainingIgnoreCase(search, pageable)
        : backupRepo.findAll(pageable);
    List<BackupInfo> content = entityPage.getContent().stream().map(this::toDto).toList();
    return new PageResult<>(content, entityPage.getTotalElements(), entityPage.getTotalPages(), entityPage.getNumber(), entityPage.getSize());
  }

  public Optional<byte[]> downloadBackup(Long id) {
    return backupRepo.findById(id).map(entity -> {
      try { return java.nio.file.Files.readAllBytes(java.nio.file.Paths.get(entity.getFilePath())); }
      catch (java.io.IOException e) { return null; }
    });
  }

  public String getFileName(Long id) { return backupRepo.findById(id).map(AutoBackupEntity::getFileName).orElse(null); }

  public Optional<String> getBackupSql(Long id) {
    return backupRepo.findById(id).map(entity -> {
      try { return java.nio.file.Files.readString(java.nio.file.Paths.get(entity.getFilePath())); }
      catch (java.io.IOException e) { return null; }
    });
  }

  private BackupInfo toDto(AutoBackupEntity e) { return new BackupInfo(e.getId(), e.getFileName(), e.getGeneratedAt().toEpochMilli(), e.getSizeBytes()); }
}
