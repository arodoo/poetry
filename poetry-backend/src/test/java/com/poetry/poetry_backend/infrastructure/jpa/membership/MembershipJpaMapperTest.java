/*
 * File: MembershipJpaMapperTest.java
 * Purpose: Unit tests for MembershipJpaMapper to ensure correct
 * enrichment of descriptive names from JPA associations.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.infrastructure.jpa.membership;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Set;

import org.junit.jupiter.api.Test;

import com.poetry.poetry_backend.domain.membership.model.Membership;
import com.poetry.poetry_backend.infrastructure.jpa.sellercode.SellerCodeEntity;
import com.poetry.poetry_backend.infrastructure.jpa.subscription.SubscriptionEntity;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserEntity;

class MembershipJpaMapperTest {

    @Test
    void shouldMapEntityToEnrichedDomain() {
        // Given
        UserEntity user = new UserEntity();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setUsername("johndoe");

        SubscriptionEntity sub = new SubscriptionEntity();
        sub.setName("Gold Plan");

        UserEntity sellerUser = new UserEntity();
        sellerUser.setFirstName("Jane");
        sellerUser.setLastName("Seller");

        SellerCodeEntity seller = new SellerCodeEntity();
        seller.setCode("SC001");
        seller.setUser(sellerUser);

        MembershipEntity entity = new MembershipEntity();
        entity.setId(1L);
        entity.setUserId(10L);
        entity.setUser(user);
        entity.setSubscriptionId(20L);
        entity.setSubscription(sub);
        entity.setSellerCode("SC001");
        entity.setSellerInfo(seller);
        entity.setStatus("ACTIVE");
        entity.setZoneIds(Set.of(1L));

        // When
        Membership domain = MembershipJpaMapper.toDomain(entity);

        // Then
        assertEquals("John Doe", domain.userName());
        assertEquals("Gold Plan", domain.subscriptionName());
        assertEquals("Jane Seller", domain.sellerName());
    }

    @Test
    void shouldFallbackToUsernameWhenNamesAreMissing() {
        // Given
        UserEntity user = new UserEntity();
        user.setUsername("onlyuser");

        MembershipEntity entity = new MembershipEntity();
        entity.setUser(user);

        // When
        Membership domain = MembershipJpaMapper.toDomain(entity);

        // Then
        assertEquals("onlyuser", domain.userName());
    }
}
