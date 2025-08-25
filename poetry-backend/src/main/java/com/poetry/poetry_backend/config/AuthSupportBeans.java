/*
 * File: AuthSupportBeans.java
 * Purpose: Aggregator configuration kept minimal after splitting bean
 * definitions into dedicated small config classes (Core and Security)
 * to satisfy strict max line rules while preserving wiring clarity.
 * Provides only marker enabling scheduling. All Rights Reserved.
 * Arodi Emmanuel
 */
package com.poetry.poetry_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

@Configuration
@EnableScheduling
public class AuthSupportBeans {
  /* Intentionally empty marker */ }
