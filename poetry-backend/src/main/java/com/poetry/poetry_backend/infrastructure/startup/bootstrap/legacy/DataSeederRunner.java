/*
 * File: DataSeederRunner.java
 * Purpose: (LEGACY) Seeds the database with initial data for development and testing.
 * This legacy runner was disabled and moved to a legacy package to avoid
 * interfering with the modern membership bootstrap process during startup.
 * Keep as reference only; it is not active in normal development runs.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.startup.bootstrap.legacy;

import org.springframework.boot.CommandLineRunner;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j
public class DataSeederRunner implements CommandLineRunner {

  @Override
  @Transactional
  public void run(String... args) throws Exception {
    log.info("DataSeederRunner (legacy): disabled");
    return;
  }
}
