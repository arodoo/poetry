/*
 * File: FontWeightsProviderPort.java
 * Purpose: Port interface for providing font weights list.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.interfaces.v1.tokens.ports;

import java.util.List;

public interface FontWeightsProviderPort {
  List<String> getFontWeights();
}
