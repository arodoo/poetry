/*
 * File: UITokensCurrentProvider.java
 * Purpose: Data provider for current UI token selections,
 * supplying hardcoded current theme and customization choices.
 * All Rights Reserved. Arodi Emmanuel
 */

package com.poetry.poetry_backend.interfaces.v1;

public class UITokensCurrentProvider {

  public static UITokensDto.Current getCurrent() {
    UITokensDto.Current current = new UITokensDto.Current();
    current.theme = "default";
    current.font = "Inter";
    current.fontSize = "default";
    current.spacing = "default";
    current.radius = "default";
    current.shadow = "default";
    return current;
  }
}
