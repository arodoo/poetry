/*
 * File: EmailNormalizerSimpleAdapter.java
 * Purpose: Provides deterministic normalization of email addresses for
 * registration: trims whitespace, lowercases domain, lowercases local
 * part except preserving case where provider sensitive, strips plus tags
 * for common providers (gmail/outlook). Extensible via strategy later.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.security;

import com.poetry.poetry_backend.application.auth.port.EmailNormalizerPort;

public class EmailNormalizerSimpleAdapter implements EmailNormalizerPort {
  public String normalize(String rawEmail) {
    if (rawEmail == null)
      return null;
    String e = rawEmail.trim();
    int at = e.indexOf('@');
    if (at < 1 || at == e.length() - 1)
      return e.toLowerCase();
    String local = e.substring(0, at);
    String domain = e.substring(at + 1);
    String ld = domain.toLowerCase();
    String ll = local;
    if (ld.equals("gmail.com") ||
        ld.equals("googlemail.com") ||
        ld.equals("outlook.com") ||
        ld.equals("hotmail.com")) {
      int plus = local.indexOf('+');
      if (plus >= 0)
        ll = local.substring(0, plus);
      ll = ll.replace(".", "");
      ll = ll.toLowerCase();
    } else {
      ll = ll.toLowerCase();
    }
    return ll + "@" + ld;
  }
}
