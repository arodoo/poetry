/*
 * File: MembershipBootstrapSupport.java
 * Purpose: Helper component that creates test dependencies for membership
 * bootstrapping, including users, subscriptions, seller codes, and zones.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup.bootstrap;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.poetry.poetry_backend.domain.sellercode.model.SellerCode;
import com.poetry.poetry_backend.domain.subscription.model.Subscription;
import com.poetry.poetry_backend.domain.user.model.core.User;
import com.poetry.poetry_backend.domain.zone.model.Zone;
import com.poetry.poetry_backend.infrastructure.jpa.sellercode.SellerCodeEntity;
import com.poetry.poetry_backend.infrastructure.jpa.sellercode.SellerCodeJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.subscription.SubscriptionJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.zone.ZoneJpaRepository;

@Component
public class MembershipBootstrapSupport {
    private static final Logger log = LoggerFactory.getLogger(MembershipBootstrapSupport.class);

    private final UserJpaRepository userRepo;
    private final SubscriptionJpaRepository subscriptionRepo;
    private final SellerCodeJpaRepository sellerCodeRepo;
    private final ZoneJpaRepository zoneRepo;

    public MembershipBootstrapSupport(
            UserJpaRepository userRepo,
            SubscriptionJpaRepository subscriptionRepo,
            SellerCodeJpaRepository sellerCodeRepo,
            ZoneJpaRepository zoneRepo) {
        this.userRepo = userRepo;
        this.subscriptionRepo = subscriptionRepo;
        this.sellerCodeRepo = sellerCodeRepo;
        this.zoneRepo = zoneRepo;
    }

    public List<User> createTestUsers(int count) {
        List<User> result = new ArrayList<>();
        userRepo.findAllActive().stream()
            .limit(count)
            .forEach(entity -> result.add(new User(
                entity.getId(),
                entity.getFirstName(),
                entity.getLastName(),
                entity.getEmail(),
                entity.getUsername(),
                entity.getLocale(),
                entity.getStatus(),
                entity.getRoles(),
                entity.getCreatedAt(),
                entity.getUpdatedAt(),
                entity.getDeletedAt(),
                entity.getVersion()
            )));
        log.debug("Found {} existing users for membership bootstrap", result.size());
        return result;
    }

    public List<Subscription> createTestSubscriptions(int count) {
        List<Subscription> result = new ArrayList<>();
        subscriptionRepo.findAll().stream()
            .limit(count)
            .forEach(entity -> result.add(new Subscription(
                entity.getId(),
                entity.getName(),
                entity.getDescription(),
                entity.getPrice(),
                entity.getCurrency(),
                entity.getDurationDays(),
                entity.getFeatures(),
                entity.getStatus(),
                entity.getCreatedAt(),
                entity.getUpdatedAt(),
                entity.getDeletedAt(),
                entity.getVersion()
            )));
        log.debug("Found {} existing subs for membership bootstrap", result.size());
        return result;
    }

    public List<SellerCode> createTestSellerCodes(int count) {
        List<SellerCode> result = new ArrayList<>();
        sellerCodeRepo.findAll().stream()
            .limit(count)
            .forEach(entity -> result.add(mapSellerCode(entity)));
        log.debug("Found {} existing seller codes", result.size());
        return result;
    }

    public List<Zone> createTestZones(int count) {
        List<Zone> result = new ArrayList<>();
        zoneRepo.findAll().stream()
            .limit(count)
            .forEach(entity -> result.add(new Zone(
                entity.getId(),
                entity.getName(),
                entity.getDescription(),
                entity.getManagerId(),
                entity.getStatus(),
                entity.getCreatedAt(),
                entity.getUpdatedAt(),
                entity.getDeletedAt(),
                entity.getVersion()
            )));
        log.debug("Found {} existing zones for membership bootstrap", result.size());
        return result;
    }

    private SellerCode mapSellerCode(SellerCodeEntity entity) {
        return new SellerCode(
            entity.getId(),
            entity.getCode(),
            entity.getOrganizationId(),
            entity.getUserId(),
            entity.getStatus(),
            entity.getCreatedAt(),
            entity.getUpdatedAt(),
            entity.getDeletedAt(),
            entity.getVersion()
        );
    }

    public Set<Long> selectZones(int index, List<Zone> zones) {
        if (zones.isEmpty())
            return Set.of();
        int offset = index % zones.size();
        int count = Math.min(2, zones.size());
        return zones.subList(offset, Math.min(offset + count, zones.size()))
                .stream()
                .map(Zone::id)
                .collect(Collectors.toSet());
    }
}
