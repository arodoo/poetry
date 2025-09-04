/*
 * File: FontControllerTest.java
 * Purpose: Placeholder test ensuring font module has a controller test per module rules.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.font;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;

class FontControllerTest {
  @Test
  void controllerLoads() {
    FontController controller = new FontController();
    assertNotNull(controller);
  }
}
