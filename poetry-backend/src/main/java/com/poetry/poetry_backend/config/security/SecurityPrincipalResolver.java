/*
 * File: SecurityPrincipalResolver.java
 * Purpose: Helper to resolve current username from SecurityContext.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.config.security;

import java.security.Principal;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SecurityPrincipalResolver {
  public String currentUsername(Principal p) {
    if (p != null && p.getName() != null && !p.getName().isBlank()) {
      return p.getName();
    }
    Authentication a =
      SecurityContextHolder.getContext().getAuthentication();
    if (a != null && a.getName() != null && !a.getName().isBlank()) {
      return a.getName();
    }
    return null;
  }
}
