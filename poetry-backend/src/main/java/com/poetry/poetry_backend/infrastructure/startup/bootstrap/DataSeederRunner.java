/*
 * File: DataSeederRunner.java
 * Purpose: Seeds the database with initial data for development/testing.
 * Creates users, subscriptions, and memberships if none exist.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup.bootstrap;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.poetry.poetry_backend.infrastructure.jpa.membership.audit.UserHasMembershipEntity;
import com.poetry.poetry_backend.infrastructure.jpa.membership.audit.UserHasMembershipJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.subscription.SubscriptionEntity;
import com.poetry.poetry_backend.infrastructure.jpa.subscription.SubscriptionJpaRepository;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserEntity;
import com.poetry.poetry_backend.infrastructure.jpa.user.UserJpaRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeederRunner implements CommandLineRunner {

  private final UserJpaRepository userRepo;
  private final SubscriptionJpaRepository subRepo;
  private final UserHasMembershipJpaRepository membershipRepo;

  @Override
  @Transactional
  public void run(String... args) throws Exception {
    long currentCount = membershipRepo.count();
    if (currentCount >= 50) {
      log.info("Database already has {} memberships. Skipping seeding.", currentCount);
      return;
    }

    log.info("Seeding database to ensure 50 varied memberships...");

    // Get or Create Subscription
    SubscriptionEntity sub = subRepo.findByName("Premium Plan").orElseGet(() -> {
      SubscriptionEntity newSub = new SubscriptionEntity();
      newSub.setName("Premium Plan");
      newSub.setDescription("All access pass");
      newSub.setPrice(new BigDecimal("29.99"));
      newSub.setDurationDays(30);
      newSub.setFeatures(Set.of("gym", "pool", "sauna"));
      return subRepo.save(newSub);
    });

    Random random = new Random();
    Instant now = Instant.now();

    for (int i = 1; i <= 50; i++) {
      final int index = i;
      String username = "user" + i;
      String email = "user" + i + "@example.com";

      // Get or Create User
      UserEntity user = userRepo.findByUsername(username).orElseGet(() -> {
        UserEntity newUser = new UserEntity();
        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setFirstName("User");
        newUser.setLastName(String.valueOf(index));
        newUser.setRoles(new HashSet<>(Set.of("USER")));
        return userRepo.save(newUser);
      });

      // Check if user already has membership
      if (!membershipRepo.findByUserId(user.getId()).isEmpty()) {
        continue;
      }

      // Create Membership
      UserHasMembershipEntity membership = new UserHasMembershipEntity();
      membership.setUserId(user.getId());
      membership.setSubscriptionId(sub.getId());
      membership.setSellerCode("ADMIN");
      membership.setStartDate(now.minus(30, ChronoUnit.DAYS));

      int type = random.nextInt(10); // 0-9
      if (type < 3) { // 30% Active (> 7 days left)
        membership.setStatus("active");
        membership.setEndDate(now.plus(15, ChronoUnit.DAYS));
      } else if (type < 5) { // 20% Expiring (<= 7 days left)
        membership.setStatus("active"); // Status is active but expiring based on date
        membership.setEndDate(now.plus(3, ChronoUnit.DAYS));
      } else { // 50% Expired
        membership.setStatus("active"); // Keep active status so it appears in queries
        membership.setEndDate(now.minus(1, ChronoUnit.DAYS));
      }

      membershipRepo.save(membership);
    }

    log.info("Database seeding complete.");
  }
}
