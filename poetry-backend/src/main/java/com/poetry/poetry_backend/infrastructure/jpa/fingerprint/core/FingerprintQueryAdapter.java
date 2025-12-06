/*
 * File: FingerprintQueryAdapter.java
 * Purpose: Query-side adapter implementing FingerprintQueryPort.
 * Handles read operations with soft-delete filtering.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.fingerprint.core;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.application.fingerprint.port.FingerprintQueryPort;
import com.poetry.poetry_backend.domain.fingerprint.model.core.Fingerprint;
import com.poetry.poetry_backend.domain.fingerprint.model.core.FingerprintStatus;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class FingerprintQueryAdapter implements FingerprintQueryPort {
    private final FingerprintJpaRepository repository;
    private final FingerprintJpaMapper mapper;

    @Override
    public Optional<Fingerprint> findById(Long id) {
        return repository.findById(id)
                .filter(e -> e.getDeletedAt() == null)
                .map(mapper::toDomain);
    }

    @Override
    public List<Fingerprint> findAll() {
        return repository.findAllNotDeleted().stream().map(mapper::toDomain).toList();
    }

    @Override
    public List<Fingerprint> findByUserId(Long userId) {
        return repository.findByUserId(userId).stream().map(mapper::toDomain).toList();
    }

    @Override
    public List<Fingerprint> findActiveByUserId(Long userId) {
        return repository.findByUserIdAndStatus(userId, FingerprintStatus.ACTIVE)
                .stream().map(mapper::toDomain).toList();
    }

    @Override
    public Optional<Fingerprint> findByR503SlotId(Integer slotId) {
        return repository.findByR503SlotId(slotId)
                .filter(e -> e.getDeletedAt() == null)
                .map(mapper::toDomain);
    }

    @Override
    public boolean existsByUserId(Long userId) {
        return repository.existsByUserId(userId);
    }

    @Override
    public List<Fingerprint> findInactiveOlderThan(Instant cutoff, int limit) {
        return repository.findInactiveOlderThan(cutoff, PageRequest.of(0, limit))
                .stream().map(mapper::toDomain).toList();
    }
}
