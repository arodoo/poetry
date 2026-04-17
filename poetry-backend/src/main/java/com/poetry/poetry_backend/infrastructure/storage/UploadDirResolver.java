/*
 * File: UploadDirResolver.java
 * Purpose: Resolves a configured upload directory string to an absolute,
 * writable Path. Relative values are re-rooted under the user's home
 * directory so the installer-launched JVM (CWD in Program Files) can
 * still create folders without admin rights. Eagerly creates the dir.
 * All Rights Reserved. Arodi Emmanuel
 */
package com.poetry.poetry_backend.infrastructure.storage;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public final class UploadDirResolver {
  private UploadDirResolver() {}

  public static Path resolve(String configured) {
    Path p = Paths.get(configured);
    if (!p.isAbsolute()) {
      String home = System.getProperty("user.home");
      String stripped = configured
          .replaceFirst("^\\./", "")
          .replaceFirst("^\\.\\\\", "");
      p = Paths.get(home, ".poetry", stripped);
    }
    try {
      Files.createDirectories(p);
    } catch (IOException e) {
      throw new IllegalStateException(
          "upload.dir.create.failed: " + p, e);
    }
    return p.toAbsolutePath().normalize();
  }
}
