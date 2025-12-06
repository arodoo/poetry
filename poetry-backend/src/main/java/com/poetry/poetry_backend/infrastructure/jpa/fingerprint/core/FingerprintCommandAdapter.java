/*
 * File: FingerprintCommandAdapter.java
 * Purpose: Command-side adapter implementing FingerprintCommandPort.
 * Handles write operations with soft-delete support.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.fingerprint.core;

import java.time.Instant;

import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintCommandPort;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class FingerprintCommandAdapter implements FingerprintCommandPort {
    private final FingerprintJpaRepository repository;
    private final FingerprintJpaMapper mapper;

    @Override
    public Fingerprint save(Fingerprint fingerprint) {
        FingerprintEntity entity = mapper.toEntity(fingerprint);
        return mapper.toDomain(repository.save(entity));
    }

    @Override
    public void deleteById(Long id) {
        repository.findById(id).ifPresent(entity -> {
            entity.setDeletedAt(Instant.now());
            repository.save(entity);
        });
    }
}
