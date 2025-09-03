/*
 * File: RadiusProviderPort.java
 * Purpose: Port interface for providing radius sets.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens.ports;

import java.util.List;

import com.poetry.poetry_backend.interfaces.v1.tokens.UITokensDto;

public interface RadiusProviderPort {
  List<UITokensDto.RadiusSet> getRadius();
}
